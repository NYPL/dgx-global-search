import aws from 'aws-sdk';

/**
 * setProfile(profile)
 * Switches tabs by updating state and href.
 *
 * @param {string} profile - The name of the profile for decryption, i.e.
 * nypl-sandbox or nypl-digital-dev. This only needs to be set to run locally,
 * when running on AWS this does not need to be set
 * @param {string} region - The region where the AWS profile is
 */
function setProfile(profile, region = 'us-east-1') {
  // Set aws creds:
  if (profile) {
    aws.config.credentials = new aws.SharedIniFileCredentials({
      profile,
    });
  }

  // Set aws region:
  const awsSecurity = { region };
  aws.config.update(awsSecurity);
}

/**
 * decrypt(encrypted, profile, region)
 * Decrypts a string encrypted with AWS encryption.
 *
 * @param {string} encrypted - The value of the encrypted string
 * @param {string} profile - The name of the profile for decryption
 * @param {string} region - The region where the AWS profile is
 */
function decrypt(encrypted, profile, region) {
  return new Promise((resolve, reject) => {
    setProfile(profile, region);

    const kms = new aws.KMS();
    kms.decrypt(
      { CiphertextBlob: Buffer.from(encrypted, 'base64') },
      (err, data) => {
        if (err) return reject(err);

        const decrypted = data.Plaintext.toString('ascii');
        resolve(decrypted);
      },
    );
  });
}

module.exports = { decrypt, setProfile };
