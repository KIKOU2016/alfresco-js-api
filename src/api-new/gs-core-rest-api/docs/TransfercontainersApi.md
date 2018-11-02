# .TransfercontainersApi

All URIs are relative to *https://localhost/alfresco/api/-default-/public/gs/versions/1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getTransferContainer**](TransfercontainersApi.md#getTransferContainer) | **GET** /transfer-containers/{transferContainerId} | Get a transfer container
[**listTransfers**](TransfercontainersApi.md#listTransfers) | **GET** /transfer-containers/{transferContainerId}/transfers | List transfer container&#39;s children
[**updateTransferContainer**](TransfercontainersApi.md#updateTransferContainer) | **PUT** /transfer-containers/{transferContainerId} | Update transfer container


<a name="getTransferContainer"></a>
# **getTransferContainer**
> TransferContainerEntry getTransferContainer(transferContainerIdopts)

Get a transfer container

Gets information for transfer container **transferContainerId**

Mandatory fields and the transfer container&#39;s aspects and properties are returned by default.

You can use the **include** parameter (include&#x3D;allowableOperations) to return additional information.


### Example
```javascript
import TransfercontainersApi from 'TransfercontainersApi';
import { AlfrescoApi } from 'alfresco-js-api';

this.alfrescoApi = new AlfrescoApi();
this.alfrescoApi.setConfig({
    hostEcm: 'http://127.0.0.1:8080'
});

let transfercontainersApi = new TransfercontainersApi(this.alfrescoApi);

let opts = { 
  'include':  // Array<string> | Returns additional information about the transfer container. Any optional field from the response model can be requested. For example:
* allowableOperations
* path

  'fields':  // Array<string> | A list of field names.

You can use this parameter to restrict the fields
returned within a response if, for example, you want to save on overall bandwidth.

The list applies to a returned individual
entity or entries within a collection.

If the API method also supports the **include**
parameter, then the fields specified in the **include**
parameter are returned in addition to those specified in the **fields** parameter.

};

transfercontainersApi.getTransferContainer(transferContainerIdopts).then(function(data) {
  console.log('API called successfully. Returned data: ' + data);
}, function(error) {
  console.error(error);
});

```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **transferContainerId** | **string**| The identifier of a transfer container. You can also use the -transfers- alias. | 
 **include** | [**Array&lt;string&gt;**](string.md)| Returns additional information about the transfer container. Any optional field from the response model can be requested. For example:
* allowableOperations
* path
 | [optional] 
 **fields** | [**Array&lt;string&gt;**](string.md)| A list of field names.

You can use this parameter to restrict the fields
returned within a response if, for example, you want to save on overall bandwidth.

The list applies to a returned individual
entity or entries within a collection.

If the API method also supports the **include**
parameter, then the fields specified in the **include**
parameter are returned in addition to those specified in the **fields** parameter.
 | [optional] 

### Return type

[**TransferContainerEntry**](TransferContainerEntry.md)

<a name="listTransfers"></a>
# **listTransfers**
> TransferContainerAssociationPaging listTransfers(transferContainerIdopts)

List transfer container&#39;s children

Returns a list of transfers.

Minimal information for each child is returned by default.

You can use the **include** parameter (include&#x3D;allowableOperations) to return additional information.


### Example
```javascript
import TransfercontainersApi from 'TransfercontainersApi';
import { AlfrescoApi } from 'alfresco-js-api';

this.alfrescoApi = new AlfrescoApi();
this.alfrescoApi.setConfig({
    hostEcm: 'http://127.0.0.1:8080'
});

let transfercontainersApi = new TransfercontainersApi(this.alfrescoApi);

let opts = { 
  'skipCount': 56 // number | The number of entities that exist in the collection before those included in this list.
  'maxItems': 56 // number | The maximum number of items to return in the list.
  'include':  // Array<string> | Returns additional information about the transfer folders. Any optional field from the response model can be requested. For example:
* allowableOperations
* aspectNames
* properties
* transferPDFIndicator
* transferLocation
* transferAccessionIndicator

  'includeSource': true // boolean | Also include **source** (in addition to **entries**) with folder information on the specified parent **transferContainerId**.
  'fields':  // Array<string> | A list of field names.

You can use this parameter to restrict the fields
returned within a response if, for example, you want to save on overall bandwidth.

The list applies to a returned individual
entity or entries within a collection.

If the API method also supports the **include**
parameter, then the fields specified in the **include**
parameter are returned in addition to those specified in the **fields** parameter.

};

transfercontainersApi.listTransfers(transferContainerIdopts).then(function(data) {
  console.log('API called successfully. Returned data: ' + data);
}, function(error) {
  console.error(error);
});

```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **transferContainerId** | **string**| The identifier of a transfer container. You can also use the -transfers- alias. | 
 **skipCount** | **number**| The number of entities that exist in the collection before those included in this list. | [optional] 
 **maxItems** | **number**| The maximum number of items to return in the list. | [optional] 
 **include** | [**Array&lt;string&gt;**](string.md)| Returns additional information about the transfer folders. Any optional field from the response model can be requested. For example:
* allowableOperations
* aspectNames
* properties
* transferPDFIndicator
* transferLocation
* transferAccessionIndicator
 | [optional] 
 **includeSource** | **boolean**| Also include **source** (in addition to **entries**) with folder information on the specified parent **transferContainerId**. | [optional] 
 **fields** | [**Array&lt;string&gt;**](string.md)| A list of field names.

You can use this parameter to restrict the fields
returned within a response if, for example, you want to save on overall bandwidth.

The list applies to a returned individual
entity or entries within a collection.

If the API method also supports the **include**
parameter, then the fields specified in the **include**
parameter are returned in addition to those specified in the **fields** parameter.
 | [optional] 

### Return type

[**TransferContainerAssociationPaging**](TransferContainerAssociationPaging.md)

<a name="updateTransferContainer"></a>
# **updateTransferContainer**
> TransferContainerEntry updateTransferContainer(transferContainerIdnodeBodyUpdateopts)

Update transfer container

Updates the transfer container **transferContainerId**. For example, you can rename transfer container:
JSON
{
  \&quot;name\&quot;:\&quot;My new name\&quot;
}

You can also set or update description and title properties:
JSON
{
  \&quot;properties\&quot;:
    {
       \&quot;cm:description\&quot;: \&quot;New Description\&quot;,
       \&quot;cm:title\&quot;:\&quot;New Title\&quot;
    }
}

**Note:** Currently there is no optimistic locking for updates, so they are applied in \&quot;last one wins\&quot; order.


### Example
```javascript
import TransfercontainersApi from 'TransfercontainersApi';
import { AlfrescoApi } from 'alfresco-js-api';

this.alfrescoApi = new AlfrescoApi();
this.alfrescoApi.setConfig({
    hostEcm: 'http://127.0.0.1:8080'
});

let transfercontainersApi = new TransfercontainersApi(this.alfrescoApi);

let opts = { 
  'include':  // Array<string> | Returns additional information about the transfer container. Any optional field from the response model can be requested. For example:
* allowableOperations
* path

  'fields':  // Array<string> | A list of field names.

You can use this parameter to restrict the fields
returned within a response if, for example, you want to save on overall bandwidth.

The list applies to a returned individual
entity or entries within a collection.

If the API method also supports the **include**
parameter, then the fields specified in the **include**
parameter are returned in addition to those specified in the **fields** parameter.

};

transfercontainersApi.updateTransferContainer(transferContainerIdnodeBodyUpdateopts).then(function(data) {
  console.log('API called successfully. Returned data: ' + data);
}, function(error) {
  console.error(error);
});

```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **transferContainerId** | **string**| The identifier of a transfer container. You can also use the -transfers- alias. | 
 **nodeBodyUpdate** | [**TransferContainerBodyUpdate**](TransferContainerBodyUpdate.md)| The node information to update. | 
 **include** | [**Array&lt;string&gt;**](string.md)| Returns additional information about the transfer container. Any optional field from the response model can be requested. For example:
* allowableOperations
* path
 | [optional] 
 **fields** | [**Array&lt;string&gt;**](string.md)| A list of field names.

You can use this parameter to restrict the fields
returned within a response if, for example, you want to save on overall bandwidth.

The list applies to a returned individual
entity or entries within a collection.

If the API method also supports the **include**
parameter, then the fields specified in the **include**
parameter are returned in addition to those specified in the **fields** parameter.
 | [optional] 

### Return type

[**TransferContainerEntry**](TransferContainerEntry.md)
