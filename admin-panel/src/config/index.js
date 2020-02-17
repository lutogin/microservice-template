import dotenv from 'dotenv-safe';

export const port = process.env.PORT;
export const connectionDBString = process.env.DB_STRING_CONNECTION;
export const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
export const telegramBotName = process.env.TELEGRAM_BOT_NAME;
export const telegramBotPaymentKey = process.env.TELEGRAM_BOT_PAYMENT_KEY;
export const baseApiUrl = process.env.BASE_API_URL;

export const cloudinaryConfig = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
};

export const liqPayConfig = {
  public_key: process.env.LIQPAY_PUBLIC_KEY,
  private_key: process.env.LIQPAY_PRIVATE_KEY,
  server_url: process.env.LIQPAY_SERVER_URL,
  sandbox: process.env.LIQPAY_SANDBOX,
};

export const isProduction = process.env.NODE_ENV === 'production';
export const isLive = process.env.NODE_ENV === 'production';

dotenv.config();

export { default as sentryConfig } from './sentry-config';
