import nodemailer from 'nodemailer';
import config from '../config/config';
import logger from '../config/logger';

const transport = nodemailer.createTransport(config.email.smtp);
/* istanbul ignore next */
if (config.env !== 'test') {
  transport
    .verify()
    .then(() => logger.info('Connected to email server'))
    .catch(() =>
      logger.warn(
        'Unable to connect to email server. Make sure you have configured the SMTP options in .env'
      )
    );
}

/**
 * Send an email
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @returns {Promise}
 */
const sendEmail = async (to: string, subject: string, text: string) => {
  const msg = { from: config.email.from, to, subject, text };
  await transport.sendMail(msg);
};

/**
 * Send reset password email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendResetPasswordEmail = async (to: string, token: string) => {
  const subject = 'Reset password';
  // replace this url with the link to the reset password page of your front-end app
  const resetPasswordUrl = `http://localhost:3000/auth/new-password?token=${token}`;
  const text = `Dear user,
To reset your password, click on this link: ${resetPasswordUrl}
If you did not request any password resets, then ignore this email.`;
  await sendEmail(to, subject, text);
};

/**
 * Send verification email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendVerificationEmail = async (to: string, token: string) => {
  const subject = 'Email Verification';
  // replace this url with the link to the email verification page of your front-end app
  const verificationEmailUrl = `http://localhost:3000/auth/new-verification?token=${token}`;
  const text = `Dear user,
To verify your email, click on this link: ${verificationEmailUrl}`;
  await sendEmail(to, subject, text);
};

/**
 * Send workspace invitation email
 * @param {string} to
 * @param {Object} invitationData
 * @param {string} invitationData.inviterName
 * @param {string} invitationData.workspaceName
 * @param {string} invitationData.invitationLink
 * @returns {Promise}
 */
const sendWorkspaceInvitationEmail = async (
  to: string,
  invitationData: { inviterName: string; workspaceName: string; invitationLink: string }
) => {
  const subject = `Invitation to join ${invitationData.workspaceName} workspace`;
  const text = `Dear user,

You have been invited by ${invitationData.inviterName} to join the "${invitationData.workspaceName}" workspace.

To accept this invitation and join the workspace, please click on the following link:
${invitationData.invitationLink}

If you don't have an account yet, you'll be able to create one after clicking the link.

If you believe this invitation was sent to you by mistake, you can safely ignore this email.

Best regards,
The Streamline Team`;

  await sendEmail(to, subject, text);
};

export default {
  transport,
  sendEmail,
  sendResetPasswordEmail,
  sendVerificationEmail,
  sendWorkspaceInvitationEmail
};
