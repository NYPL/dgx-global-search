import redis from 'redis';
import appConfig from '../../../appConfig';
import kms from '../../../src/app/utils/kms-helper';

const {
  redisHosts,
} = appConfig;

function ClientWrapper() {
  this.rawClient = process.env.appEnv
    ? redis.createClient(6379, redisHosts[process.env.appEnv])
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
