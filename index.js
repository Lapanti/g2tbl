/* eslint no-undef: 'off', no-console: 'off' */
const Trello = require('node-trello')
const config = require('./config')
const MailListener = require('mail-listener2')
const util = require('util')

const t = new Trello(config.trello_key, config.trello_token)

const mailListener = new MailListener({
  username: config.email_user,
  password: config.email_password,
  host: config.email_host,
  port: config.email_port,
  tls: config.email_secure,
  mailbox: config.email_mailbox,
  markSeen: config.markSeen
})

function createCard(name, desc, callback) {
  const newCard = { name, desc, idList: config.trello_list_id }
  t.post('/1/cards/', newCard, function(err, data) {
    if (err) throw err
    callback(data)
  })
}

mailListener.start()
console.log('Starting listening\nPress CTRL + C to quit')
mailListener.on('server:connected', () => console.log('IMAP connected'))
mailListener.on('error', (err) => console.log(`Encountered an error ${err}`))
mailListener.on('mail', (mail, seqno, attributes) => console.log(`Mail parsed: ${util.inspect(mail, false, null)} with ${util.inspect(attributes, false, null)}`))
