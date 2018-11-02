# .SharedLink

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [optional] [default to null]
**expiresAt** | **Date** |  | [optional] [default to null]
**nodeId** | **string** |  | [optional] [default to null]
**name** | **string** | The name must not contain spaces or the following special characters: * \&quot; &lt; &gt; \\ / ? : and |.
The character . must not be used at the end of the name.
 | [optional] [default to null]
**title** | **string** |  | [optional] [default to null]
**description** | **string** |  | [optional] [default to null]
**modifiedAt** | **Date** |  | [optional] [default to null]
**modifiedByUser** | [**UserInfo**](UserInfo.md) |  | [optional] [default to null]
**sharedByUser** | [**UserInfo**](UserInfo.md) |  | [optional] [default to null]
**content** | [**ContentInfo**](ContentInfo.md) |  | [optional] [default to null]
**allowableOperations** | **Array<string>** | The allowable operations for the Quickshare link itself. See allowableOperationsOnTarget for the
allowable operations pertaining to the linked content node.
 | [optional] [default to null]
**allowableOperationsOnTarget** | **Array<string>** | The allowable operations for the content node being shared.
 | [optional] [default to null]

