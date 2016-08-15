const config = {
  // Get your developer key and token for Trello API from https://trello.com/app-key
  trello_key: 'Your trello key comes here',
  trello_token: 'Your trello token comes here',
  // Find the id of the list you want new cards to be added, instructions can be found here:
  // https://developers.trello.com/get-started/start-building#create
  trello_list_id: 'The id of the list to publish new cards to',
  // Choose appropriate auth scopes from https://developers.google.com/gmail/api/auth/scopes
  // To receive e-mails follow this guide: https://developers.google.com/gmail/api/guides/push
  g_scopes: [
    'https://www.googleapis.com/auth/gmail.send',
    'https://www.googleapis.com/auth/gmail.readonly'
  ],
  // Get google auth from https://console.developers.google.com/apis/library
  // https://github.com/google/google-api-nodejs-client/#authorizing-and-authenticating
  g_client_id: 'Your Oauth2 client id',
  g_client_secret: 'Your Oauth2 client secret',
  // If you have an actual site you wish to redirect to change the following value:
  g_redirect_url: 'https://google.fi',
  // Set the topic in Google's pubsub developer console
  // Add serviceAccount:gmail-api-push@system.gserviceaccount.com as a Pub/sub-publisher to the topic
  gmail_topic: 'projects/your-project/your-topic',
  // These values are received when authenticating the application for the first time
  g_access_token: '',
  g_token_type: '',
  g_refresh_token: '',
  g_expiry_date: 12345678910,
  // gmail_reply_email is the text you want to send as a response to a new thread
  gmail_reply_email: 'Hi, this is an automated message from g2tbl, your e-mail has been added to Trello'
};

module.exports = config;
