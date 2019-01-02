import redis from 'redis';

function ClientWrapper() {
  this.rawClient = redis.createClient();
  this.connected = false;
  this.rawClient.on('connect', () => {
    this.connected = true;
    console.log('REDIS CONNECT');
  });
  this.rawClient.on('error', (err) => {
    this.connected = false;
    console.log('REDIS ERROR', err);
  });
  this.rawClient.on('reconnecting', (delay) => {
    console.log('REDIS RECONNECTING: ', delay);
  });
  this.get = (key, callback) => (this.connected
    ? this.rawClient.get(key, callback)
    : callback(null, null));
  this.set = (key, value, code, timeout) => (this.connected
    ? this.rawClient.set(key, value, code, timeout)
    : null);
}

export default ClientWrapper;
