const config = {
  // Get your developer key and token for Trello API from https://trello.com/app-key
  trello_key: 'Your trello key comes here',
  trello_token: 'Your trello token comes here',
  // Find the id of the list you want new cards to be added, instructions can be found here:
  // https://developers.trello.com/get-started/start-building#create
  trello_list_id: 'The id of the list to publish new cards to',
  // Choose appropriate auth scopes from https://developers.google.com/gmail/api/auth/scopes
  // To receive e-mails follow this guide: https://developers.google.com/gmail/api/guides/push
  gmail_scopes: [
    'https://www.googleapis.com/auth/gmail.send',
    'https://www.googleapis.com/auth/gmail.readonly'
  ],
  // Get google auth from https://console.developers.google.com/apis/library
  // https://github.com/google/google-api-nodejs-client/#authorizing-and-authenticating
  gmail_client_id: 'Your Oauth2 client id',
  gmail_client_secret: 'Your Oauth2 client secret',
  gmail_redirect_url: '',
  // Set the topic in Google's pubsub developer console
  gmail_topic: 'projects/your-project/your-topic',
  // gmail_reply_email is the text you want to send as a response to a new thread
  gmail_reply_email: 'Hi, this is an automated message from g2tbl, your e-mail has been added to Trello'
};

module.exports = config;
