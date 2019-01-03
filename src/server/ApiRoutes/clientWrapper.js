import redis from 'redis';

/**
 ClientWrapper:
  1) Holds the redis client,
  2) Tracks the connection to the redis client,
  3) Calls the redis getter and setter functions when the connection is good,
  4) Calls dummy getter and setter functions when the connection is bad to avoid
     errors.
 */

function ClientWrapper(host) {
  console.log('REDIS HOST: ', host);
  this.rawClient = host
    ? redis.createClient(6379, host)
    : redis.createClient();
  this.connected = false;
  this.rawClient.on('connect', () => {
    this.connected = true;
    console.error('REDIS CONNECT');
  });
  this.rawClient.on('error', (err) => {
    this.connected = false;
    console.error('REDIS ERROR', err);
  });
  this.rawClient.on('reconnecting', (delay) => {
    console.error('REDIS RECONNECTING: ', delay);
  });
  this.get = (key, callback) => (this.connected
    ? this.rawClient.get(key, callback)
    : callback(null, null));
  this.set = (key, value, code, timeout) => (this.connected
    ? this.rawClient.set(key, value, code, timeout)
    : null);
}

export default ClientWrapper;
