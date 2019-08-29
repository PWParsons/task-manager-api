const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (user) => {
  sgMail.send({
    to: user.email,
    from: process.env.MAIL_FROM_ADDRESS,
    subject: 'Thanks for joining in!',
    text: `Welcome to the app, ${user.name}. Let me know how you get along with the app.`
  })
}

const sendCancellationEmail = (user) => {
  sgMail.send({
    to: user.email,
    from: process.env.MAIL_FROM_ADDRESS,
    subject: 'Sorry to see you go!',
    text: `Goodbye, ${user.name}. Is there anything we could have done to have kept you on board?.`
  })
}

module.exports = {
  sendWelcomeEmail,
  sendCancellationEmail
}