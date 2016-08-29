/*eslint no-undef: 'off'*/
const config = {
  // Enablde development mode, only creates cards and replies to emails sent from
  // the email set as email_user
  DEVELOP: false,
  // Get your developer key and token for Trello API from https://trello.com/app-key
  trello_key: 'Your trello key comes here',
  trello_token: 'Your trello token comes here',
  // Find the id of the list you want new cards to be added, instructions can be found here:
  // https://developers.trello.com/get-started/start-building#create
  trello_list_id: 'The id of the list to publish new cards to',
  // Fill in your email information (DO NOT PUSH TO VERSION CONTROL):
  // Settings from: https://github.com/circuithub/mail-listener
  email_user: 'your@email.address',
  email_password: 'yourpassword',
  email_host: 'imap.gmail.com',
  email_port: 993,
  email_secure: true,
  email_mailbox: 'INBOX',
  email_mark_seen: true,
  // reply_email is the text you want to send as a response to a new thread
  reply_email: 'Hi, this is an automated message from g2tbl, your e-mail has been added to Trello'
}

module.exports = config
