// Import the dotenv package to load environment variables from a .env file
import dotenv from 'dotenv';

export default async function globalSetup() {
    console.log('Global setup starting...');

    // Load environment variables based on the ENV value
    const env = process.env.ENV || 'local';
    const envFilePath = `env/.env.${env}`;

    // Configure dotenv to read the appropriate .env file
    dotenv.config({ path: envFilePath });

    console.log(`Environment variables loaded from ${envFilePath}`);
}