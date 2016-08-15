/* eslint no-undef: 'off', no-console: 'off' */
const readline = require('readline');
const Trello = require('node-trello');
const google = require('googleapis');
const config = require('./config');

const t = new Trello(config.trello_key, config.trello_token);
const gmail = google.gmail('v1');
const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(config.g_client_id, config.g_client_secret, config.g_redirect_url);

function createCard(name, desc, callback) {
  const newCard = { name, desc, idList: config.trello_list_id };
  t.post('/1/cards/', newCard, function(err, data) {
    if (err) throw err;
    callback(data);
  });
}

// Built on top of the Google example here:
// https://github.com/google/google-api-nodejs-client/blob/master/samples/oauth2.js
function getAccessToken() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: config.g_scopes
  });
  console.log('Visit this url:\n', url);
  rl.question('Enter the code on the url (after ?code=) here:', function(code) {
    oauth2Client.getToken(code, function(err, tokens) {
      if (err) throw err;
      console.log('Add the following tokens to config.js:\n', tokens);
    });
  });
}

if (config.g_refresh_token === '' && config.g_access_token === '') {
  getAccessToken();
  process.exit();
} else {
  oauth2Client.setCredentials({
    access_token: config.g_access_token,
    token_type: config.g_token_type,
    refresh_token: config.g_refresh_token,
    expiry_date: config.g_expiry_date
  });
  const watchRequest = {
    auth: oauth2Client,
    userId: 'me',
    resource: {
      topicName: config.gmail_topic,
      labelIds: ['INBOX']
    }
  };
  gmail.users.watch(watchRequest, function(err, data) {
    if (err) throw err;
    console.log('Got a push notification:', data);
  });
}
