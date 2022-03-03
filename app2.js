import { createClient, SchemaFieldTypes, AggregateGroupByReducers, AggregateSteps } from 'redis';
import fs from 'fs'


async function redisJSONDemo () {
  try {
    var keyprefix = "profile::";
    var profile_prefix = 'KKNg25mFm_Q0eOG0rf2R7'

    const client = createClient({
          url: 'redis://default:SceKGdmO9JwoDuUmEBv6QEWV6do5ADp2@redis-14897.c280.us-central1-2.gce.cloud.redislabs.com:14897'
    });

    client.on('error', err => {
      console.log('Error ' + err);
    });

    await client.connect();

    for (let counter = 1; counter < 6; counter++) {
      await client.json.set(keyprefix + counter, '$', { profileId: profile_prefix + counter }); 
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

    console.log(
      await client.ft.search('idx22', '@profileId:KKNg25mFm_Q0eOG0rf2R73')
    );

//    var obj = JSON.parse(client.ft.search('idx22', '@profileId:KKNg25mFm_Q0eOG0rf2R73'));
    var result = client.ft.search('idx22', '@profileId:KKNg25mFm_Q0eOG0rf2R73');


    for (const item in result) {
      console.log(item)
    }
   


    Object.entries(result).map(item => {
       console.log(item)
    })

    await client.quit();
  } catch (e) {
    console.error(e);
  }
}

redisJSONDemo();
