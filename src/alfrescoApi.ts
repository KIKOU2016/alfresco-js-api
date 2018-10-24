/*!
 * @license
 * Copyright 2018 Alfresco Software, Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import Emitter = require('event-emitter');

import { AlfrescoContent } from './alfrescoContent';
import { AlfrescoUpload } from './alfrescoUpload';
import { EcmAuth } from './ecmAuth';
import { BpmAuth } from './bpmAuth';
import { Oauth2Auth } from './oauth2Auth';
import { EcmClient } from './ecmClient';
import { BpmClient } from './bpmClient';
import { Storage } from './storage';
import { AlfrescoApiConfig } from './alfrescoApiConfig';

export class AlfrescoApi {
    /**
     * @param {Object} config
     *
     *      config = {
     *        hostEcm:       // hostEcm Your share server IP or DNS name
     *        hostBpm: // hostBpm Your activiti server IP or DNS name
     *        authType: // kind of authentication BASIC or OAUTH
     *        oauth2: {host:'http://127.0.0.1:9191', clientId:'alfrescoexample', secret:'secret'}
     *        contextRoot: // contextRoot default value alfresco
     *        contextRootBpm: // contextRoot activiti default value activiti-app
     *        provider:   // ECM BPM ALL OAUTH, default ECM
     *        ticketEcm:     // Ticket if you already have a ECM ticket you can pass only the ticket and skip the login, in this case you don't need username and password
     *        ticketBpm:     // Ticket if you already have a BPM ticket you can pass only the ticket and skip the login, in this case you don't need username and password
     *        disableCsrf:   // To disable CSRF Token to be submitted. Only for Activiti call, by default is false.
     *        domainPrefix: // An optional prefix to append to ticket saved by the storage service.
     *    };
     */

    storage: Storage;
    config: AlfrescoApiConfig;
    ecmClient: EcmClient;
    ecmPrivateClient: EcmClient;
    bpmClient: BpmClient;
    searchClient: EcmClient;
    discoveryClient: EcmClient;
    gsClient: EcmClient;
    oauth2Auth: Oauth2Auth;
    bpmAuth: BpmAuth;
    ecmAuth: EcmAuth;

    content: AlfrescoContent;
    upload: AlfrescoUpload;
    webScript: any;

    constructor(config) {
        this.config = this.configureJsApi(config);

        Emitter.call(this);
    }

    configureJsApi(config) {
        if (!config) {
            config = {};
        }

        this.storage = new Storage();

        this.config = {
            hostEcm: config.hostEcm || 'http://127.0.0.1:8080',
            hostBpm: config.hostBpm || 'http://127.0.0.1:9999',
            oauth2: config.oauth2,
            authType: config.authType || 'BASIC',
            contextRoot: config.contextRoot || 'alfresco',
            contextRootBpm: config.contextRootBpm || 'activiti-app',
            provider: config.provider || 'ECM',
            ticketEcm: config.ticketEcm,
            ticketBpm: config.ticketBpm,
            accessToken: config.accessToken,
            disableCsrf: config.disableCsrf || false,
            domainPrefix: config.domainPrefix || ''
        };

        this.ecmPrivateClient = new EcmClient(this.config, '/api/-default-/private/alfresco/versions/1');
        this.ecmClient = new EcmClient(this.config, '/api/-default-/public/alfresco/versions/1');
        this.searchClient = new EcmClient(this.config, '/api/-default-/public/search/versions/1');
        this.discoveryClient = new EcmClient(this.config, '/api');
        this.gsClient = new EcmClient(this.config, '/api/-default-/public/gs/versions/1');
        this.bpmClient = new BpmClient(this.config);

        this.errorListeners();

        if (this.isOauthConfiguration()) {
            this.oauth2Auth = new Oauth2Auth(this.config);
            this.setAuthenticationClientECMBPM(this.oauth2Auth.getAuthentication(), this.oauth2Auth.getAuthentication());
        } else {
            this.bpmAuth = new BpmAuth(this.config);
            this.ecmAuth = new EcmAuth(this.config);
            this.setAuthenticationClientECMBPM(this.ecmAuth.getAuthentication(), this.bpmAuth.getAuthentication());
        }

        return config;
    }

    errorListeners() {
        this.ecmClient.on('error', (error) => {
            this.errorHandler(error);
        });

        this.ecmPrivateClient.on('error', (error) => {
            this.errorHandler(error);
        });

        this.bpmClient.on('error', (error) => {
            this.errorHandler(error);
        });

        this.searchClient.on('error', (error) => {
            this.errorHandler(error);
        });

        this.discoveryClient.on('error', (error) => {
            this.errorHandler(error);
        });

        this.gsClient.on('error', (error) => {
            this.errorHandler(error);
        });
    }

    errorHandler(error) {
        if (error.status === 401) {
            this.invalidateSession();
        }

        this.emit('error', error);
    }

    changeCsrfConfig(disableCsrf) {
        this.config.disableCsrf = disableCsrf;
        this.bpmAuth.changeCsrfConfig(disableCsrf);
    }

    changeEcmHost(hostEcm) {
        this.config.hostEcm = hostEcm;
        this.ecmAuth.changeHost();
        this.ecmClient.changeHost();
    }

    changeBpmHost(hostBpm) {
        this.config.hostBpm = hostBpm;
        this.bpmAuth.changeHost();
        this.bpmClient.changeHost();
    }

    /**
     * login Alfresco API
     * @param  {String} username:   // Username to login
     * @param  {String} password:   // Password to login
     *
     * @returns {Promise} A promise that returns {new authentication ticket} if resolved and {error} if rejected.
     * */
    login(username, password) {

        if (username) {
            username = username.trim();
        }

        if (this.isOauthConfiguration()) {

            let oauth2AuthPromise;

            oauth2AuthPromise = this.oauth2Auth.login(username, password);

            oauth2AuthPromise.then((accessToken) => {
                this.config.accessToken = accessToken;
            }, () => {
            });

            return oauth2AuthPromise;

        } else {

            if (this.isBpmConfiguration()) {
                let bpmPromise = this.bpmAuth.login(username, password);

                bpmPromise.then((ticketBpm) => {
                    this.config.ticketBpm = ticketBpm;
                }, () => {
                });

                return bpmPromise;
            } else if (this.isEcmConfiguration()) {
                let ecmPromise = this.ecmAuth.login(username, password);

                ecmPromise.then((ticketEcm) => {
                    this.setAuthenticationClientECMBPM(this.ecmAuth.getAuthentication(), null);

                    this.config.ticketEcm = ticketEcm;
                }, () => {
                });

                return ecmPromise;

            } else if (this.isEcmBpmConfiguration()) {
                let bpmEcmPromise = this._loginBPMECM(username, password);

                bpmEcmPromise.then((data) => {
                    this.config.ticketEcm = data[0];
                    this.config.ticketBpm = data[1];
                }, () => {
                });

                return bpmEcmPromise;
            }
        }
    }

    implicitLogin() {
        if (!this.isOauthConfiguration()) {
            return Promise.reject('Missing the required oauth2 configuration');
        }

        return new Promise((resolve, reject) => {
            this.oauth2Auth.implicitLogin();
        });
    }

    setAuthenticationClientECMBPM(authECM, authBPM) {
        this.ecmClient.setAuthentications(authECM);
        this.searchClient.setAuthentications(authECM);
        this.ecmPrivateClient.setAuthentications(authECM);
        this.bpmClient.setAuthentications(authBPM);
        this.searchClient.setAuthentications(authECM);
        this.discoveryClient.setAuthentications(authECM);
        this.gsClient.setAuthentications(authECM);
    }

    /**
     * login Tickets
     *
     * @param  {String} ticketEcm // alfresco ticket
     * @param  {String} ticketBpm // alfresco ticket
     *
     * @returns {Promise} A promise that returns { authentication ticket} if resolved and {error} if rejected.
     * */
    loginTicket(ticketEcm, ticketBpm) {
        this.config.ticketEcm = ticketEcm;
        this.config.ticketBpm = ticketBpm;

        return this.ecmAuth.validateTicket();
    }

    _loginBPMECM(username, password) {
        let ecmPromise = this.ecmAuth.login(username, password);
        let bpmPromise = this.bpmAuth.login(username, password);

        let promise: any = new Promise((resolve, reject) => {
            Promise.all([ecmPromise, bpmPromise]).then(
                (data) => {
                    promise.emit('success');
                    resolve(data);
                },
                (error) => {
                    if (error.status === 401) {
                        promise.emit('unauthorized');
                    }
                    promise.emit('error');
                    reject(error);
                });
        });

        Emitter(promise); // jshint ignore:line

        return promise;
    }

    /**
     * logout Alfresco API
     *
     * @returns {Promise} A promise that returns {new authentication ticket} if resolved and {error} if rejected.
     * */
    logout() {
        if (this.isOauthConfiguration()) {
            return this.oauth2Auth.logOut();
        } else {
            if (this.isBpmConfiguration()) {
                return this.bpmAuth.logout();
            } else if (this.isEcmConfiguration()) {
                let ecmPromise = this.ecmAuth.logout();
                ecmPromise.then(() => {
                    this.config.ticket = undefined;
                }, () => {
                });

                return ecmPromise;
            } else if (this.isEcmBpmConfiguration()) {
                return this._logoutBPMECM();
            }
        }
    }

    _logoutBPMECM() {
        let ecmPromise = this.ecmAuth.logout();
        let bpmPromise = this.bpmAuth.logout();

        let promise: any = new Promise((resolve, reject) => {
            Promise.all([ecmPromise, bpmPromise]).then(
                (data) => {
                    this.config.ticket = undefined;
                    promise.emit('logout');
                    resolve('logout');
                },
                (error) => {
                    if (error.status === 401) {
                        promise.emit('unauthorized');
                    }
                    promise.emit('error');
                    reject(error);
                });
        });

        Emitter(promise); // jshint ignore:line

        return promise;
    }

    /**
     * If the client is logged in retun true
     *
     * @returns {Boolean} is logged in
     */
    isLoggedIn(): boolean {
        if (this.isOauthConfiguration()) {
            return this.oauth2Auth.isLoggedIn();
        } else {
            if (this.isBpmConfiguration()) {
                return this.bpmAuth.isLoggedIn();
            } else if (this.isEcmConfiguration()) {
                return this.ecmAuth.isLoggedIn();
            } else if (this.isEcmBpmConfiguration()) {
                return this.ecmAuth.isLoggedIn() && this.bpmAuth.isLoggedIn();
            }
        }
    }

    isBpmLoggedIn(): boolean {
        if (this.isBpmConfiguration() || this.isEcmBpmConfiguration()) {
            if (this.isOauthConfiguration()) {
                return this.oauth2Auth.isLoggedIn();
            } else {
                return this.bpmAuth.isLoggedIn();
            }
        }
        return false;
    }

    isEcmLoggedIn(): boolean {
        if (this.isEcmConfiguration() || this.isEcmBpmConfiguration()) {
            if (this.isOauthConfiguration()) {
                return this.oauth2Auth.isLoggedIn();
            } else {
                return this.ecmAuth.isLoggedIn();
            }
        }
        return false;
    }

    getBpmUsername(): string {
        if (this.isOauthConfiguration()) {
            return this.oauth2Auth.storage.getItem('USERNAME');
        } else {
            return this.bpmAuth.storage.getItem('APS_USERNAME');
        }
    }

    getEcmUsername(): string {
        if (this.isOauthConfiguration()) {
            return this.oauth2Auth.storage.getItem('USERNAME');
        } else {
            return this.ecmAuth.storage.getItem('ACS_USERNAME');
        }
    }

    /**
     * refresh token
     * */
    refreshToken(): Promise<string> {
        if (!this.isOauthConfiguration()) {
            return Promise.reject('Missing the required oauth2 configuration');
        }

        if (this.config.oauth2.implicitFlow) {
            return Promise.reject('Manual refresh token not possible in implicit flow');
        }

        return this.oauth2Auth.refreshToken();
    }

    getTicketAuth(): string {
        return this.oauth2Auth && this.oauth2Auth.getToken();
    }

    /**
     * Set the current Ticket
     *
     * @param {String} ticketEcm
     * @param {String} TicketBpm
     * */
    setTicket(ticketEcm, TicketBpm) {
        if (this.ecmAuth) {
            this.ecmAuth.setTicket(ticketEcm);
        }
        if (this.bpmAuth) {
            this.bpmAuth.setTicket(TicketBpm);
        }
    }

    /**
     * invalidate the current session
     * */
    invalidateSession() {
        if (this.oauth2Auth) {
            this.oauth2Auth.invalidateSession();
        } else {
            this.ecmAuth.invalidateSession();
            this.bpmAuth.invalidateSession();
        }
    }

    /**
     * Get the current Ticket for the Bpm
     *
     * @returns {String} Ticket
     * */
    getTicketBpm(): string {
        return this.bpmAuth && this.bpmAuth.getTicket();
    }

    /**
     * Get the current Ticket for the Ecm
     *
     * @returns {String} Ticket
     * */
    getTicketEcm(): string {
        return this.ecmAuth && this.ecmAuth.getTicket();
    }

    /**
     * Get the current Ticket for the Ecm and BPM
     *
     * @returns {Array} Ticket
     * */
    getTicket(): string[] {
        return [this.ecmAuth.getTicket(), this.bpmAuth.getTicket()];
    }

    isBpmConfiguration(): boolean {
        return this.config.provider && this.config.provider.toUpperCase() === 'BPM';
    }

    isEcmConfiguration(): boolean {
        return this.config.provider && this.config.provider.toUpperCase() === 'ECM';
    }

    isOauthConfiguration(): boolean {
        return this.config.authType === 'OAUTH';
    }

    isEcmBpmConfiguration(): boolean {
        return this.config.provider && this.config.provider.toUpperCase() === 'ALL';
    }


    on = Emitter.on;
    off = Emitter.off;
    once = Emitter.once;
    emit = Emitter.emit;
}