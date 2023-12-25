const nodemailer = require("nodemailer");
const {
  mailHost,
  mailPort,
  mailAuthUser,
  mailAuthPassword,
} = require("../configs/env.variables");

exports.transporter = nodemailer.createTransport({
  host: mailHost,
  port: mailPort,
  secure: false,
  auth: {
    user: mailAuthUser,
    pass: mailAuthPassword,
  },
});
