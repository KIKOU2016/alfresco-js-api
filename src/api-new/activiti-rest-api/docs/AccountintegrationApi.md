# .AccountintegrationApi

All URIs are relative to *https://adfdev.envalfresco.com/activiti-app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getAccountsUsingGET**](AccountintegrationApi.md#getAccountsUsingGET) | **GET** /enterprise/account/integration | Retrieve external account information


<a name="getAccountsUsingGET"></a>
# **getAccountsUsingGET**
> ResultListDataRepresentationAccountRepresentation getAccountsUsingGET()

Retrieve external account information

Accounts are used to integrate with third party apps and clients

### Example
```javascript
import AccountintegrationApi from 'AccountintegrationApi';
import { AlfrescoApi } from 'alfresco-js-api';

this.alfrescoApi = new AlfrescoApi();
this.alfrescoApi.setConfig({
    hostEcm: 'http://127.0.0.1:8080'
});

let accountintegrationApi = new AccountintegrationApi(this.alfrescoApi);

accountintegrationApi.getAccountsUsingGET().then(function(data) {
  console.log('API called successfully. Returned data: ' + data);
}, function(error) {
  console.error(error);
});

```

### Parameters
This endpoint does not need any parameter.

### Return type

[**ResultListDataRepresentationAccountRepresentation**](ResultListDataRepresentationAccountRepresentation.md)
