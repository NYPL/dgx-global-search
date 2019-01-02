import redis from 'redis';

function ClientWrapper() {
  this.client = redis.createClient();
  this.connected = false;
  this.client.on('connect', () => {
    this.connected = true;
    console.log('REDIS CONNECT');
  });
  this.client.on('error', (err) => {
    this.connected = false;
    console.log('REDIS ERROR', err);
  });
  this.client.on('reconnecting', (delay) => {
    console.log('REDIS RECONNECTING: ', delay);
  });
  this.get = (key, callback) => (this.connected
    ? this.client.get(key, callback)
    : callback(null, null));
  this.set = (key, value, code, timeout) => (this.connected
    ? this.client.set(key, value, code, timeout)
    : null);
}

export default ClientWrapper;
