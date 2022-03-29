#### How to index JSON array using TAG identifiers

Reference link:  
https://oss.redis.com/redisjson/indexing_JSON/#json-arrays-can-only-be-indexed-in-tag-identifiers 
   
JSON arrays can only be indexed in TAG identifiers  
  
``` 
ft.drop index5

ft.create index5 on json schema $.contact[0:].address.type as type tag $.contact[0:].address.city as city tag $.contact[0:].address.addressLine1 as addr1 tag CASESENSITIVE 

json.set person:1 $ '{"contact": [ { "address": { "addressLine1": "108 newton road", "type": "billing", "city": "cupertino", "state": "ca"}}, { "address": { "addressLine1": "122 issac road", "type": "shipping", "city": "santa clara",  "state": "ca" }} ]}'

json.set person:2 $ '{"contact": [ { "address": { "addressLine1": "222 pink road", "type": "billing", "city": "saratoga", "state": "ca"}}, { "address": { "addressLine1": "262 brown street", "type": "shipping", "city": "millbrae",  "state": "ca" }} ]}'

json.set person:3 $ '{"contact": [ { "address": { "addressLine1": "321 summer court", "type": "billing", "city": "cupertino", "state": "ca"}}, { "address": { "addressLine1": "365 winter lane", "type": "shipping", "city": "millbrae",  "state": "ca" }} ]}'

ft.search index5 @type:{billing} 
 
ft.search index5  @city:{cupertino} 
 
ft.search index5 '@city:{cupertino | saratoga}'
 
ft.search index5 '@addr1:{108 newton road}'
```
 
#### How to deal with "-" and "."
``` 
json.set person:1 $ '{"contact": [ { "address": { "addressLine1": "108 newton-road.", "type": "billing", "city": "cupertino", "state": "ca"}}, { "address": { "addressLine1": "122 issac road", "type": "shipping", "city": "santa clara",  "state": "ca" }} ]}'
 
ft.search index5 '@addr1:{108 newton\-road\.}'
``` 
  


