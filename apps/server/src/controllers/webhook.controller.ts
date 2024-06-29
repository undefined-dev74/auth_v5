import { Webhook } from 'svix';
import catchAsync from '../utils/catchAsync';

const handleWebhook = catchAsync(async (req, res) => {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET) {
    throw new Error('You need a WEBHOOK_SECRET in your .env');
  }

  // Get the headers and body
  const headers = req.headers;
  const payload = req.body;

  // Get the Svix headers for verification
  const svix_id = headers['svix-id'];
  const svix_timestamp = headers['svix-timestamp'];
  const svix_signature = headers['svix-signature'];

  // If there are no Svix headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return res.status(400).json({ error: 'Error occurred -- no svix headers' });
  }

  // Create a new Svix instance with your secret.
  const wh: Webhook = new Webhook(WEBHOOK_SECRET);

  let evt: any;

  // Attempt to verify the incoming webhook
  // If successful, the payload will be available from 'evt'
  // If the verification fails, error out and return error code
  try {
    evt = wh.verify(payload, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature
    } as any);
  } catch (err: any) {
    console.log('Error verifying webhook:', err.message);
    return res.status(400).json({
      success: false,
      message: err.message
    });
  }

  // Do something with the payload
  // For this guide, you simply log the payload to the console

  if (evt.type === 'user.created') {
    console.log('userId:', evt.data.id);
  }

  return res.status(200).json({
    success: true,
    message: 'Webhook received'
  });
});

export default { handleWebhook };
