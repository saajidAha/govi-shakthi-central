import dotenv from 'dotenv';
/**
 * Loads the keys from .env files;
 */
dotenv.config();
export let API_KEY: string = String(process.env.API_KEY);
export let MONGODB_URI = String(process.env.MONGODB_URI);