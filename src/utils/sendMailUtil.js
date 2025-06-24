const nodemailer = require("nodemailer");

/**
 * Send an email using Mailtrap, Gmail, or AWS SES
 */
const sendEmail = async (to, subject, htmlContent, type = "mailtrap") => {
  try {
    let transporter;

    switch (type) {
      case "gmail":
        transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });
        break;

      case "mailtrap":
        transporter = nodemailer.createTransport({
          host: "sandbox.smtp.mailtrap.io",
          port: 2525,
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });
        break;

      case "ses":
        console.log("AWS_SES_SMTP_PASS", process.env.AWS_SES_SMTP_PASS);
        transporter = nodemailer.createTransport({
          host: `email-smtp.${process.env.AWS_REGION}.amazonaws.com`,
          port: 587, // TLS port
          secure: false,
          auth: {
            user: process.env.AWS_SES_SMTP_USER, // Must use SMTP credentials
            pass: process.env.AWS_SES_SMTP_PASS,
          },
        });
        break;

      default:
        throw new Error("Unsupported email provider");
    }

    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to,
      subject: subject || "No Subject",
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${to}: ${info.messageId}`);

    return info;
  } catch (error) {
    console.error(`❌ Error sending email to ${to}:`, error.message);
    throw new Error(error.message || "Email sending failed");
  }
};

module.exports = sendEmail;
