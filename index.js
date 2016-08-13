const Trello = require('node-trello');
const google = require('googleapis');
const config = require('./config');

const t = new Trello(config.trello_key, config.trello_token);
const gmail = google.gmail('v1');

function createCard(name, desc, callback) {
  const newCard = { name, desc, idList: config.trello_list_id };
  t.post('/1/cards/', newCard, function(err, data) {
    if (err) throw err;
    callback(data);
  });
}

const watchRequest = {
  topicName: config.gmail_topic,
  labelIds: ['INBOX']
}

// TODO:
// https://www.sitepoint.com/mastering-your-inbox-with-gmail-javascript-api/
// https://developers.google.com/gmail/api/guides/push
// https://github.com/google/google-api-nodejs-client/#installation
