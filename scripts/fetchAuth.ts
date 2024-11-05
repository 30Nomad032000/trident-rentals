import { Redis } from '@upstash/redis';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const redis = Redis.fromEnv();

const client_id = process.env.CLIENT_ID as string;
const client_secret = process.env.CLIENT_SECRET as string;
const redirect_uri = process.env.REDIRECT_URI as string;
const auth_code = process.env.AUTH_CODE as string; // Temporary storage since it's valid for only 10 minutes

console.log(client_id, client_secret, redirect_uri, auth_code);

const token_url = 'https://accounts.zoho.in/oauth/v2/token';

interface ZohoTokenResponse {
  access_token: string;
  refresh_token: string;
  api_domain: string;
  token_type: string;
  expires_in: number;
}

interface Tokens {
  refresh_token: string;
  access_token: string;
  expires_in: number;
  obtained_at: number;
}

(async () => {
  const params = new URLSearchParams();
  params.append('grant_type', 'authorization_code');
  params.append('client_id', client_id);
  params.append('client_secret', client_secret);
  params.append('redirect_uri', redirect_uri);
  params.append('code', auth_code);

  try {
    const response = await fetch(token_url, {
      method: 'POST',
      body: params,
    });

    const data = (await response.json()) as ZohoTokenResponse & {
      error?: string;
    };

    if (data.error) {
      console.error('Error:', data.error);
    } else {
      const { access_token, refresh_token, expires_in } = data;

      const tokens: Tokens = {
        refresh_token,
        access_token,
        expires_in,
        obtained_at: Date.now(),
      };

      await redis.set('zoho_tokens', JSON.stringify(tokens));

      console.log('Tokens obtained and stored successfully in Upstash KV');
    }
  } catch (error) {
    console.error('Error:', (error as Error).message);
  }
})();
