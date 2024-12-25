import dotenv from 'dotenv';
/**
 * Utility class that loads the private keys from .env files;
 * .env files containing (API Keys or any other private keys) will not be pushed to git.
 * Request the keys from the developer of this code if you require it.
 */
export class EnvKeyLoader{
    static {dotenv.config();}
    static readonly API_KEY: string = String(process.env.API_KEY);
    static readonly MONGODB_URI: string = String(process.env.MONGODB_URI);
}