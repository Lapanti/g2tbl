/* eslint no-undef: 'off', no-console: 'off' */
const config = require('./config')
const Trello = require('node-trello')
const MailListener = require('mail-listener2')
const nodemailer = require('nodemailer')
const util = require('util')

const t = new Trello(config.trello_key, config.trello_token)
const trelloEmailEnding = '@boards.trello.com'

//https://nodemailer.com/2-0-0-beta/setup-smtp/
const mailConfig = {
  host: config.email_host,
  port: config.email_port,
  secure: config.email_secure,
  auth: {
    user: config.email_user,
    pass: config.email_password
  }
}
const transporter = nodemailer.createTransport(mailConfig)

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
    console.log(`New Trello card created with name ${name}`)
    callback(data)
  })
}

function fetchCard(cardId, callback) {
  t.get(`/1/cards/${cardId}`, function(err, data) {
    if (err) throw err
    console.log(`Card email: ${data.email}`)
    callback(data)
  })
}

function hasCard(email, callback) {
  const toAddresses = (email.to || []).map((object) => object == null ? '' : object.address)
  const ccAddresses = (email.cc || []).map((object) => object == null ? '' : object.address)
  const bccAddresses = (email.bcc || []).map((object) => object == null ? '' : object.address)
  const allAddresses = [...toAddresses, ...ccAddresses, ...bccAddresses]
  const found = allAddresses.find((address) => address.endsWith(trelloEmailEnding))
  const devCheck = config.DEVELOP ? email.from === config.email_user : true
  if (!found && devCheck) {
    console.log('New email received, creating Trello card for it')
    callback(email)
  }
}

function sendReply(email, cardEmail) {
  const reply = {
    from: config.email_user,
    to: email.to,
    cc: email.cc != null ? [...email.cc, cardEmail] : [cardEmail],
    bcc: email.bcc,
    subject: email.subject,
    text: `${config.reply_email}\n${cardEmail}\n${config.reply_email_signature}`,
    inReplyTo: email.messageId
  }
  console.log(`Sending reply to ${email.subject}`)
  transporter.sendMail(reply, (err, info) => {
    if (err) throw err
    console.log(`Email sent: ${info.response}`)
  })
}

mailListener.start()
console.log('Starting listening\nPress CTRL + C to quit')
mailListener.on('server:connected', () => console.log('IMAP connected'))
mailListener.on('error', (err) => console.log(`Encountered an error ${err}`))
mailListener.on('mail', (mail) => {
  console.log(`Mail received with ${mail.subject}`)
  hasCard(mail,
    createCard(mail.subject, mail.text,
      origData => fetchCard(origData.id,
        (fetchedData) => sendReply(mail, fetchedData.email))))
})
