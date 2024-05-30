const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const {authenticate} = require('@google-cloud/local-auth');
const {google} = require('googleapis');

const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];

const TOKEN_PATH = path.join(process.cwd(), 'google', 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'google', 'credentials.json');

/**
 * Serializes credentials to a file compatible with GoogleAUth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client) {
    const content = await fs.readFile(CREDENTIALS_PATH);
    const keys = JSON.parse(content);
    const key = keys.installed || keys.web;
    const payload = JSON.stringify({
      type: 'authorized_user',
      client_id: key.client_id,
      client_secret: key.client_secret,
      refresh_token: client.credentials.refresh_token,
    });
    await fs.writeFile(TOKEN_PATH, payload);
}

async function authorize() {
    await fs.unlink(TOKEN_PATH);

    client = await authenticate({
      scopes: SCOPES,
      keyfilePath: CREDENTIALS_PATH,
    });

    if (client.credentials) {
      await saveCredentials(client);
    }

    return client;
}

authorize()