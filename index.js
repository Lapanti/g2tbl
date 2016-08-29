/* eslint no-undef: 'off', no-console: 'off' */
const Trello = require('node-trello')
const config = require('./config')
const MailListener = require('mail-listener2')
const util = require('util')

const t = new Trello(config.trello_key, config.trello_token)
const trelloEmailEnding = '@boards.trello.com'

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

function fetchCard(cardId, callback) {
  t.get(`/1/cards/${cardId}`, function(err, data) {
    if (err) throw err
    callback(data)
  })
}

function hasCard(email, callback) {
  const toAddresses = (email.to || []).map((object) => object == null ? '' : object.address)
  const ccAddresses = (email.cc || []).map((object) => object == null ? '' : object.address)
  const bccAddresses = (email.bcc || []).map((object) => object == null ? '' : object.address)
  const allAddresses = [...toAddresses, ...ccAddresses, ...bccAddresses]
  console.log(`Received addresses ${util.inspect(allAddresses, false, null)}`)
  const found = allAddresses.find((address) => address.endsWith(trelloEmailEnding))
  const devCheck = config.DEVELOP ? email.from === config.email_user : true
  console.log(`Found a trello email: ${found}`)
  if (!found && devCheck) {
    callback(email)
  }
}

function sendReply(email, cardEmail) {
  console.log(`Got email address ${cardEmail} for email ${email.subject}`)
}

mailListener.start()
console.log('Starting listening\nPress CTRL + C to quit')
mailListener.on('server:connected', () => console.log('IMAP connected'))
mailListener.on('error', (err) => console.log(`Encountered an error ${err}`))
mailListener.on('mail', (mail) => {
  hasCard(mail,
    createCard(email.subject, email.text,
      origData => fetchCard(origData.id,
        (fetchedData) => sendReply(mail, fetchedData.email))))
})
