import { createClient, SchemaFieldTypes, AggregateGroupByReducers, AggregateSteps } from 'redis';
import fs from 'fs'


async function redisJSONDemo () {
  try {
    var keyprefix = "profile::";
    var profile_prefix = 'KKNg25m@gmail.com'

    const client = createClient({
          url: 'redis://default:SceKGdmO9JwoDuUmEBv6QEWV6do5ADp2@redis-14897.c280.us-central1-2.gce.cloud.redislabs.com:14897'
    });

    client.on('error', err => {
      console.log('Error ' + err);
    });

    await client.connect();

    for (let counter = 1; counter < 6; counter++) {
      await client.json.set(keyprefix + counter, '$', { profileId: (counter + profile_prefix).replace(/\./g, '\\.').replace(/\@/g, '\\@') }); 
      const value = await client.json.get(keyprefix + counter, {
      // JSON Path: .node = the element called 'node' at root level.
        path: '.profileId'
      });
      console.log('key: ' + keyprefix + counter + `, value of profileId: ${value}`);
    }

    await client.ft.dropIndex('idx22');
    await client.ft.create('idx22', {
       '$.profileId': {type: SchemaFieldTypes.TEXT, sortable:true, AS: 'profileId'}},
       {
          ON: 'JSON',
          PREFIX: keyprefix
       }
    );

    var email_address_esc = "3KKNg25m@gmail.com".replace(/\./g, '\\.').replace(/\@/g, '\\@');
    console.log(email_address_esc);    

    var results = await client.ft.search('idx22', `@profileId:${email_address_esc}`);
    console.log(results);
    console.log(results.documents);

    await client.quit();
  } catch (e) {
    console.error(e);
  }
}

redisJSONDemo();
