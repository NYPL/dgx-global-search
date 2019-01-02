import redis from 'redis';

function ClientWrapper() {
  this.client = redis.createClient();
  const that = this;
  this.connected = false;
  this.client.on('connect', () => {
    that.connected = true;
    console.log('REDIS CONNECT');
  });
  this.client.on('error', (err) => {
    that.connected = false;
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
