import { expect } from 'chai';
import sinon from 'sinon';
import getApiRoot from '../src/server/getApiRoot.js';
import aws from '../src/app/utils/kms-helper.js';

describe('Get API Root', () => {
  const decryptSpy = sinon.spy(aws, 'decrypt');
  const app = {
    locals: {
      apiRoot: 'www.searchwithgoogle.com',
    },
  };
  const apiRootEnv = 'www.searchwithbing.com';
  const appEnv = 'development';
  const regionEnv = 'antarctica-pole-1';
  let anotherApp = {
    locals: {},
  };

  afterEach(() => {
    anotherApp = {
      locals: {},
    };
  });

  it('should end the fucntion if the parameter "app.locals.apiRoot" already exists.', () => {
    const callGetApiRoot = getApiRoot({}, {}, () => {});
    callGetApiRoot(app, apiRootEnv, appEnv, regionEnv);

    expect(app.locals.apiRoot).to.deep.equal('www.searchwithgoogle.com');
    expect(decryptSpy.calledOnce).to.equal(false);
  });

  it('should assign the value of "apiRootEnv" to "app.locals.apiRoot", if "app.locals.apiRoot" '
    + 'does not exist and "apiRootEnv" is valid.', () => {
    const callGetApiRoot = getApiRoot({}, {}, () => {});
    callGetApiRoot(anotherApp, apiRootEnv, appEnv, regionEnv);

    expect(anotherApp.locals.apiRoot).to.deep.equal('www.searchwithbing.com');
    expect(decryptSpy.calledOnce).to.equal(false);
  });

  it('should execute the function to call AWS KMS service if neither "app.locals.apiRoot" nor '
    + '"apiRootEnv" exists."', () => {
    const callGetApiRoot = getApiRoot({}, {}, () => {});
    callGetApiRoot(anotherApp, undefined, appEnv, regionEnv);

    expect(decryptSpy.calledOnce).to.equal(true);
  });
});
