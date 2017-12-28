/**
 * @author: Juan Estiven Mazo <estivenm930@gmail.com>
 */

const nodemailer = require('nodemailer');
const config = require('../config/config');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  // secure: false, // use SSL
  // port: 25, // port for secure SMTP
  tls: {
    rejectUnauthorized: false,
  },
  auth: {
    user: config.email.user,
    pass: config.email.pass,
  },
});

const sendMails = (req, res) => {
  // console.log(req.body);
  // const transporter = nodemailer.createTransport({
  //   service: 'gmail',
  //   tls: {
  //     rejectUnauthorized: false,
  //   },
  //   auth: {
  //     user: req.body.user,
  //     pass: req.body.pass,
  //   },
  // });
  const mailOptions = {
    // from: config.email.user,
    from: 'm.duque@h2apublicidad.com',
    to: req.body.email,
    subject: req.body.subject,
    text: req.body.text,
    html: req.body.html,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ mensaje: error });
    }
    console.log(info);
    return res.status(200).json(info);
  });
};

module.exports = sendMails;

