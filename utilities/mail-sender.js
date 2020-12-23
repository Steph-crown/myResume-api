/**
 *  THIS MODULE SENDS MAILS FROM THE SERVER
 */


var nodemailer = require('nodemailer');

module.exports = async function(subject, body) {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'stephtechnologies8@gmail.com',
      pass: 'mobols2000'
    }
  });

  var mailOptions = {
    from: '"Steph Technologies" <stephtechnologies8@gmail.com>',
    to: 'emmanuelstephen024@gmail.com',
    subject: subject,
    html: body
  };

  try {
    data = await transporter.sendMail(mailOptions);
    return data;
  }catch(err) {
    return err
  }
}