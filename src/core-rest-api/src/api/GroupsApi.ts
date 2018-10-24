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

import { AlfrescoApiClient } from '../../../alfrescoApiClient';
import { Error } from '../model/Error';
import { GroupBody } from '../model/GroupBody';
import { GroupsPaging } from '../model/GroupsPaging';
import { GroupsEntry } from '../model/GroupsEntry';
import { GroupMemberPaging } from '../model/GroupMemberPaging';
import { GroupMemberEntry } from '../model/GroupMemberEntry';

/**
 * Tags service.
 * @module api/GroupsApi
 * @version 0.1.0
 */

/**
 * Constructs a new GroupsApi.
 * @alias module:api/GroupsApi
 * @class
 * @param {module:ApiClient} apiClient Optional API client implementation to use, default to {@link module:ApiClient#instance}
 * if unspecified.
 */
export class GroupsApi {

    apiClient: AlfrescoApiClient;

    constructor(apiClient?: AlfrescoApiClient) {
        this.apiClient = apiClient || new AlfrescoApiClient();
    }


    /**
     * Create a new group
     * @param {module:model/GroupBody} GroupBody The new group
     * @param {Object} opts Optional parameters
     * @param {string[]} opts.include Use the relations parameter to include one or more related entities in a single response.
     * @param {string[]} opts.fields A list of field names.\n\nYou can use this parameter to restrict the fields\nreturned within a response if, for example, you want to save on overall bandwidth.\n\nThe list applies to a returned individual\nentity or entries within a collection.\n\nIf the API method also supports the **include**\nparameter, then the fields specified in the **include**\nparameter are returned in addition to those specified in the **fields** parameter.\n
     * data is of type: {module:model/GroupsEntry}
     */

    createGroup(groupBody, opts) {
        let postBody = groupBody;
        opts = opts || {};

        // verify the required parameter 'tagBody' is set
        if (groupBody == undefined || groupBody == null) {
            throw "Missing param 'groupBody' in createGroup";
        }

        let pathParams = {};

        let queryParams = {
            'include': this.apiClient.buildCollectionParam(opts['include'], 'csv'),
            'fields': this.apiClient.buildCollectionParam(opts['fields'], 'csv')
        };
        let headerParams = {};
        let formParams = {};

        let authNames = ['basicAuth'];
        let contentTypes = [this.apiClient.contentTypes.json];
        let accepts = [this.apiClient.contentTypes.json];
        let returnType = GroupsEntry;

        return this.apiClient.callApi(
            '/groups', 'POST',
            pathParams, queryParams, headerParams, formParams, postBody,
            authNames, contentTypes, accepts, returnType
        );
    }

    /**
     * Get groups
     * Returns a list of groups in this repository. You can sort the list if groups using the **orderBy** parameter.\n**orderBy** specifies the name of one or more\ncomma separated properties.\nFor each property you can optionally specify the order direction.\nBoth of the these **orderBy** examples retrieve sites ordered by ascending name:\n\n&#x60;&#x60;&#x60;\nname\nname ASC\n&#x60;&#x60;&#x60;\n\nYou can use the **relations** parameter to include one or more related\nentities in a single response and so reduce network traffic.\n\nThe entity types in Alfresco are organized in a tree structure.\nThe **sites** entity has two children, **containers** and **members**.\nThe following relations parameter returns all the container and member\nobjects related to each site:\n\n&#x60;&#x60;&#x60;\ncontainers,members\n&#x60;&#x60;&#x60;\n
     * @param {Object} opts Optional parameters
     * @param {Integer} opts.skipCount The number of entities that exist in the collection before those included in this list.
     * @param {Integer} opts.maxItems The maximum number of items to return in the list.
     * @param {String} opts.orderBy A string to control the order of the entities returned.
     * @param {String} opts.where A string to restrict the returned objects by using a predicate.
     * @param {string[]} opts.include Use the relations parameter to include one or more related entities in a single response.
     * @param {string[]} opts.fields A list of field names.\n\nYou can use this parameter to restrict the fields\nreturned within a response if, for example, you want to save on overall bandwidth.\n\nThe list applies to a returned individual\nentity or entries within a collection.\n\nIf the API method also supports the **include**\nparameter, then the fields specified in the **include**\nparameter are returned in addition to those specified in the **fields** parameter.\n
     * data is of type: {module:model/GroupsPaging}
     */
    getGroups(opts) {
        opts = opts || {};
        let postBody = null;


        let pathParams = {};
        let queryParams = {
            'skipCount': opts['skipCount'],
            'maxItems': opts['maxItems'],
            'orderBy': opts['orderBy'],
            'where': opts['where'],
            'include': this.apiClient.buildCollectionParam(opts['include'], 'csv'),
            'fields': this.apiClient.buildCollectionParam(opts['fields'], 'csv')
        };
        let headerParams = {};
        let formParams = {};

        let authNames = ['basicAuth'];
        let contentTypes = [this.apiClient.contentTypes.json];
        let accepts = [this.apiClient.contentTypes.json];
        let returnType = GroupsPaging;

        return this.apiClient.callApi(
            '/groups', 'GET',
            pathParams, queryParams, headerParams, formParams, postBody,
            authNames, contentTypes, accepts, returnType
        );
    }

    /**
     * Delete a group
     * Deletes the site with **groupId**.
     * @param {String} groupId The identifier of a site.
     * @param {Boolean} opts.cascade If true then the delete will be applied in cascade to sub-groups.
     */
    deleteGroup(groupId, opts) {
        opts = opts || {};
        let postBody = null;

        // verify the required parameter 'siteId' is set
        if (groupId == undefined || groupId == null) {
            throw "Missing param 'groupId' in deleteGroup";
        }

        let cascadeDelete = opts['cascade'] ? opts['cascade'] : false;

        let pathParams = {
            'groupId': groupId
        };
        let queryParams = {
            'cascade': cascadeDelete
        };
        let headerParams = {};
        let formParams = {};

        let authNames = ['basicAuth'];
        let contentTypes = [this.apiClient.contentTypes.json];
        let accepts = [this.apiClient.contentTypes.json];
        let returnType = null;

        return this.apiClient.callApi(
            '/groups/{groupId}', 'DELETE',
            pathParams, queryParams, headerParams, formParams, postBody,
            authNames, contentTypes, accepts, returnType
        );
    }

    /**
     * Get a group
     * Returns information for site **groupId**.\n\nYou can use the **relations** parameter to include one or more related\nentities in a single response and so reduce network traffic.\n\nThe entity types in Alfresco are organized in a tree structure.\nThe **sites** entity has two children, **containers** and **members**.\nThe following relations parameter returns all the container and member\nobjects related to the site **siteId**:\n\n&#x60;&#x60;&#x60;\ncontainers,members\n&#x60;&#x60;&#x60;\n
     * @param {String} groupId The identifier of a site.
     * @param {Object} opts Optional parameters
     * @param {string[]} opts.include Returns additional information about the group. The following optional fields can be requested: parentIds, zones
     * @param {string[]} opts.fields A list of field names.You can use this parameter to restrict the fields returned within a response if, for example, you want to save on overall bandwidth.The list applies to a returned individual entity or entries within a collection.If the API method also supports the include parameter, then the fields specified in the include parameter are returned in addition to those specified in the fields parameter.
     * data is of type: {module:model/GroupsEntry}
     */
    getGroup(groupId, opts) {
        opts = opts || {};
        let postBody = null;

        // verify the required parameter 'siteId' is set
        if (groupId == undefined || groupId == null) {
            throw "Missing param 'groupId' in getGroup";
        }


        let pathParams = {
            'groupId': groupId
        };
        let queryParams = {
            'include': this.apiClient.buildCollectionParam(opts['include'], 'csv'),
            'fields': this.apiClient.buildCollectionParam(opts['fields'], 'csv')
        };
        let headerParams = {};
        let formParams = {};

        let authNames = ['basicAuth'];
        let contentTypes = [this.apiClient.contentTypes.json];
        let accepts = [this.apiClient.contentTypes.json];
        let returnType = GroupsEntry;

        return this.apiClient.callApi(
            '/groups/{groupId}', 'GET',
            pathParams, queryParams, headerParams, formParams, postBody,
            authNames, contentTypes, accepts, returnType
        );
    }

    /**
     * Update a site member
     * Update details (displayName) for group groupId. You must have admin rights to update a group.
     * @param {String} groupId The identifier of a site.
     * @param {module:model/GroupBody} groupBody only the displayName change attribute is allowed.
     * @param {Object} opts Optional parameters
     * @param {string[]} opts.include Returns additional information about the group. The following optional fields can be requested: parentIds, zones
     * @param {string[]} opts.fields A list of field names.You can use this parameter to restrict the fields returned within a response if, for example, you want to save on overall bandwidth.The list applies to a returned individual entity or entries within a collection.If the API method also supports the include parameter, then the fields specified in the include parameter are returned in addition to those specified in the fields parameter.
     * data is of type: {module:model/GroupsEntry}
     */
    updateGroup(groupId, groupBody, opts) {
        opts = opts || {};
        let postBody = groupBody;

        // verify the required parameter 'siteId' is set
        if (groupId == undefined || groupId == null) {
            throw "Missing param 'groupId' in updateGroup";
        }

        // verify the required parameter 'personId' is set
        if (groupBody == undefined || groupBody == null) {
            throw "Missing param 'groupBody' in updateGroup";
        }

        // verify the required parameter 'personId' is set
        if (groupBody['id']) {
            throw "Id change not allowed in 'groupBody' in updateGroup";
        }


        let pathParams = {
            'groupId': groupId
        };
        let queryParams = {
            'include': this.apiClient.buildCollectionParam(opts['include'], 'csv'),
            'fields': this.apiClient.buildCollectionParam(opts['fields'], 'csv')
        };
        let headerParams = {};
        let formParams = {};

        let authNames = ['basicAuth'];
        let contentTypes = [this.apiClient.contentTypes.json];
        let accepts = [this.apiClient.contentTypes.json];
        let returnType = GroupsEntry;

        return this.apiClient.callApi(
            '/groups/{groupId}', 'PUT',
            pathParams, queryParams, headerParams, formParams, postBody,
            authNames, contentTypes, accepts, returnType
        );
    }

    /**
     * Get group members
     * Returns a list of members for group **groupId**.
     * @param {String} groupId The identifier of a site.
     * @param {Object} opts Optional parameters
     * @param {Integer} opts.skipCount The number of entities that exist in the collection before those included in this list.
     * @param {Integer} opts.maxItems The maximum number of items to return in the list.
     * @param {String} opts.orderBy A string to control the order of the entities returned.
     * @param {String} opts.where A string to restrict the returned objects by using a predicate.
     * @param {string[]} opts.fields A list of field names.\n\nYou can use this parameter to restrict the fields\nreturned within a response if, for example, you want to save on overall bandwidth.\n\nThe list applies to a returned individual\nentity or entries within a collection.\n\nIf the API method also supports the **include**\nparameter, then the fields specified in the **include**\nparameter are returned in addition to those specified in the **fields** parameter.\n
     * data is of type: {module:model/GroupMemberPaging}
     */
    getGroupMembers(groupId, opts) {
        opts = opts || {};
        let postBody = null;

        // verify the required parameter 'groupId' is set
        if (groupId == undefined || groupId == null) {
            throw "Missing param 'groupId' in getGroupMembers";
        }

        let pathParams = {
            'groupId': groupId
        };
        let queryParams = {
            'skipCount': opts['skipCount'],
            'maxItems': opts['maxItems'],
            'fields': this.apiClient.buildCollectionParam(opts['fields'], 'csv'),
            'orderBy': opts['orderBy'],
            'where': opts['where']
        };
        let headerParams = {};
        let formParams = {};

        let authNames = ['basicAuth'];
        let contentTypes = [this.apiClient.contentTypes.json];
        let accepts = [this.apiClient.contentTypes.json];
        let returnType = GroupMemberPaging;

        return this.apiClient.callApi(
            '/groups/{groupId}/members', 'GET',
            pathParams, queryParams, headerParams, formParams, postBody,
            authNames, contentTypes, accepts, returnType
        );
    }

    /**
     * Add a group member
     * Create a group membership (for an existing person or group) within a group groupId.
     * @param {String} groupId The identifier of a site.
     * @param {module:model/GroupMember} GroupMember The persons new role
     * @param {Object} opts Optional parameters
     * @param {string[]} opts.fields A list of field names.\n\nYou can use this parameter to restrict the fields\nreturned within a response if, for example, you want to save on overall bandwidth.\n\nThe list applies to a returned individual\nentity or entries within a collection.\n\nIf the API method also supports the **include**\nparameter, then the fields specified in the **include**\nparameter are returned in addition to those specified in the **fields** parameter.\n
     * data is of type: {module:model/GroupMemberEntry}
     */
    addGroupMember(groupId, groupMemberBody, opts) {
        let postBody = groupMemberBody;
        opts = opts || {};

        // verify the required parameter 'groupId' is set
        if (groupId == undefined || groupId == null) {
            throw "Missing param 'groupId' in addGroupMember";
        }

        // verify the required parameter 'groupMemberBody' is set
        if (groupMemberBody == undefined || groupMemberBody == null) {
            throw "Missing param 'groupMemberBody' in addGroupMember";
        }


        let pathParams = {
            'groupId': groupId
        };
        let queryParams = {
            'fields': this.apiClient.buildCollectionParam(opts['fields'], 'csv'),
        };
        let headerParams = {};
        let formParams = {};

        let authNames = ['basicAuth'];
        let contentTypes = [this.apiClient.contentTypes.json];
        let accepts = [this.apiClient.contentTypes.json];
        let returnType = GroupMemberEntry;

        return this.apiClient.callApi(
            '/groups/{groupId}/members', 'POST',
            pathParams, queryParams, headerParams, formParams, postBody,
            authNames, contentTypes, accepts, returnType
        );
    }

    /**
     * Delete a group membership
     * Deletes the membership **groupMemberId** from group **groupId**
     * @param {String} groupId The identifier of a group.
     * @param {String} groupMemberId The identifier of a group membership.
     */
    deleteGroupMember(groupId, groupMemberId) {
        let postBody = null;

        // verify the required parameter 'siteId' is set
        if (groupId == undefined || groupId == null) {
            throw "Missing param 'groupId' in deleteGroup";
        }

        let pathParams = {
            'groupId': groupId,
            'groupMemberId': groupMemberId
        };
        let queryParams = {};
        let headerParams = {};
        let formParams = {};

        let authNames = ['basicAuth'];
        let contentTypes = [this.apiClient.contentTypes.json];
        let accepts = [this.apiClient.contentTypes.json];
        let returnType = null;

        return this.apiClient.callApi(
            '/groups/{groupId}/members/{groupMemberId}', 'DELETE',
            pathParams, queryParams, headerParams, formParams, postBody,
            authNames, contentTypes, accepts, returnType
        );
    }

}