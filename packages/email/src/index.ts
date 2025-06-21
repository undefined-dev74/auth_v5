import { resend } from "./resend";
import type { ResendEmailOptions } from "./resend/types";
import { sendViaNodeMailer } from "./send-via-nodemailer";
import { sendEmailViaResend } from "./send-via-resend";

export const sendEmail = async (opts: ResendEmailOptions) => {
  console.log("in send mail ", opts);
  if (resend) {
    console.log("Resend is configured, sending email via Resend");
    return await sendEmailViaResend(opts);
  }

  // Fallback to SMTP if Resend is not configured
  const smtpConfigured = Boolean(
    process.env.SMTP_HOST && process.env.SMTP_PORT
  );

  if (smtpConfigured) {
    console.log("SMTP is configured, sending email via NodeMailer");
    const { email, subject, text, react } = opts;
    return await sendViaNodeMailer({
      email,
      subject,
      text,
      react,
    });
  }

  console.info(
    "Email sending failed: Neither SMTP nor Resend is configured. Please set up at least one email service to send emails."
  );
};
