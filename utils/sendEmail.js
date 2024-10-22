
import nodeMailer from "nodemailer";

export const sendEmail = async (options) => {
  const transporter = nodeMailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
    secure: true, 
    logger: true, 
    debug: true,
  });

  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: options.email,
    subject: options.subject,
    text: `${options.message} \n\nEmail of User Who Sent The Message: ${options.userEmail} contact number: ${options.contact}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!"); // Log success message
  } catch (error) {
    console.error("Error sending email:", error); // Log the error for debugging
    throw new Error("Failed to send email: " + error.message); // Include the error message
  }
};
