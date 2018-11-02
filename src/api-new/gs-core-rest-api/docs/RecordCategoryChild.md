# .RecordCategoryChild

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [default to null]
**parentId** | **string** |  | [default to null]
**name** | **string** | The name must not contain spaces or the following special characters: * \&quot; &lt; &gt; \\ / ? : and |.
The character . must not be used at the end of the name.
 | [default to null]
**nodeType** | **string** |  | [default to null]
**hasRetentionSchedule** | **boolean** | Indicates if the record category has a retention schedule defined | [optional] [default to null]
**isClosed** | **boolean** | Indicates if the record folder is closed | [optional] [default to null]
**isRecordCategory** | **boolean** |  | [optional] [default to null]
**isRecordFolder** | **boolean** |  | [optional] [default to null]
**modifiedAt** | **Date** |  | [default to null]
**modifiedByUser** | [**UserInfo**](UserInfo.md) |  | [default to null]
**createdAt** | **Date** |  | [default to null]
**createdByUser** | [**UserInfo**](UserInfo.md) |  | [default to null]
**aspectNames** | **Array<string>** |  | [optional] [default to null]
**properties** | **any** |  | [optional] [default to null]
**allowableOperations** | **Array<string>** |  | [optional] [default to null]
**path** | [**PathInfo**](PathInfo.md) |  | [optional] [default to null]

