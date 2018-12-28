import aws from 'aws-sdk';

/**
 * decrypt(encrypted)
 * Decrypts a string encrypted with AWS encryption.
 *
 * @param {string} encrypted - The value of the encrypted string
 */

function decrypt (encrypted) {
  return new Promise((resolve, reject) => {
    // If this is instantiated outside this scope (e.g. line 1 of this file),
    // it may be instantiated before AWS_* env vars are set correctly, causing
    // it to attempt to decrypt the value against the wrong account
    const AWS = require('aws-sdk')

    const kms = new AWS.KMS()
    kms.decrypt({ CiphertextBlob: Buffer.from(encrypted, 'base64') }, (err, data) => {
      if (err) return reject(err)

      var decrypted = data.Plaintext.toString('ascii');
      resolve(decrypted);
    })
  })
}

/**
 * setProfile(profile)
 * Switches tabs by updating state and href.
 *
 * @param {string} profile - The name of the profile for decryption, i.e.
 * nypl-sandbox or nypl-digital-dev. This only needs to be set to run locally,
 * when running on AWS this does not need to be set
 */

function setProfile (profile) {
  // Set aws creds:
  if (profile) {
    aws.config.credentials = new aws.SharedIniFileCredentials({
      profile: profile
    })
  }

  // Set aws region:
  // This region should be set in appConfig.js so in case we have a new region in the future
  let awsSecurity = { region: 'us-east-1' }
  aws.config.update(awsSecurity)
}

module.exports = { decrypt, setProfile }
