# .AuthenticationApi

All URIs are relative to *https://localhost/alfresco/api/-default-/public/authentication/versions/1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createTicket**](AuthenticationApi.md#createTicket) | **POST** /tickets | Create ticket (login)
[**deleteTicket**](AuthenticationApi.md#deleteTicket) | **DELETE** /tickets/-me- | Delete ticket (logout)
[**validateTicket**](AuthenticationApi.md#validateTicket) | **GET** /tickets/-me- | Validate ticket


<a name="createTicket"></a>
# **createTicket**
> TicketEntry createTicket(ticketBodyCreate)

Create ticket (login)

**Note:** this endpoint is available in Alfresco 5.2 and newer versions.

Logs in and returns the new authentication ticket.

The userId and password properties are mandatory in the request body. For example:
JSON
{
    \&quot;userId\&quot;: \&quot;jbloggs\&quot;,
    \&quot;password\&quot;: \&quot;password\&quot;
}

To use the ticket in future requests you should pass it in the request header.
For example using Javascript:
  Javascript
    request.setRequestHeader (\&quot;Authorization\&quot;, \&quot;Basic \&quot; + btoa(ticket));
  


### Example
```javascript
import AuthenticationApi from 'AuthenticationApi';
import { AlfrescoApi } from 'alfresco-js-api';

this.alfrescoApi = new AlfrescoApi();
this.alfrescoApi.setConfig({
    hostEcm: 'http://127.0.0.1:8080'
});

let authenticationApi = new AuthenticationApi(this.alfrescoApi);


authenticationApi.createTicket(ticketBodyCreate).then(function(data) {
  console.log('API called successfully. Returned data: ' + data);
}, function(error) {
  console.error(error);
});

```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **ticketBodyCreate** | [**TicketBody**](TicketBody.md)| The user credential. | 

### Return type

[**TicketEntry**](TicketEntry.md)

<a name="deleteTicket"></a>
# **deleteTicket**
> deleteTicket()

Delete ticket (logout)

**Note:** this endpoint is available in Alfresco 5.2 and newer versions.

Deletes logged in ticket (logout).


### Example
```javascript
import AuthenticationApi from 'AuthenticationApi';
import { AlfrescoApi } from 'alfresco-js-api';

this.alfrescoApi = new AlfrescoApi();
this.alfrescoApi.setConfig({
    hostEcm: 'http://127.0.0.1:8080'
});

let authenticationApi = new AuthenticationApi(this.alfrescoApi);

authenticationApi.deleteTicket().then(function() {
  console.log('API called successfully.');
}, function(error) {
  console.error(error);
});

```

### Parameters
This endpoint does not need any parameter.

### Return type

null (empty response body)

<a name="validateTicket"></a>
# **validateTicket**
> ValidTicketEntry validateTicket()

Validate ticket

**Note:** this endpoint is available in Alfresco 5.2 and newer versions.

Validates the specified ticket (derived from Authorization header) is still valid.

For example, you can pass the Authorization request header using Javascript:
  Javascript
    request.setRequestHeader (\&quot;Authorization\&quot;, \&quot;Basic \&quot; + btoa(ticket));
  


### Example
```javascript
import AuthenticationApi from 'AuthenticationApi';
import { AlfrescoApi } from 'alfresco-js-api';

this.alfrescoApi = new AlfrescoApi();
this.alfrescoApi.setConfig({
    hostEcm: 'http://127.0.0.1:8080'
});

let authenticationApi = new AuthenticationApi(this.alfrescoApi);

authenticationApi.validateTicket().then(function(data) {
  console.log('API called successfully. Returned data: ' + data);
}, function(error) {
  console.error(error);
});

```

### Parameters
This endpoint does not need any parameter.

### Return type

[**ValidTicketEntry**](ValidTicketEntry.md)
