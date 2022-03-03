const redis = require('redis');

async function redisJSONDemo () {
  try {
    const TEST_KEY = 'test_node';

    const client = redis.createClient()

    client.on('error', err => {
      console.log('Error ' + err);
    });



    await client.connect();


    // RedisJSON uses JSON Path syntax. '.' is the root.
    await client.json.set(TEST_KEY, '.', { node: 4303 });
    const value = await client.json.get(TEST_KEY, {
      // JSON Path: .node = the element called 'node' at root level.
      path: '.node'
    });

    console.log(`value of node: ${value}`);

    await client.quit();
  } catch (e) {
    console.error(e);
  }
}

redisJSONDemo();
