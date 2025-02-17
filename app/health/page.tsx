import { getAccessToken } from '../../lib/zohoAuth';

export default async function Home() {
  try {
    const token = await getAccessToken();
    console.log('Access Token:', token);
    const response = await fetch(
      'https://www.zohoapis.com/creator/v2.1/data/tridentrental/trident-rental/report/All_Properties',
      {
        headers: {
          Authorization: `Zoho-oauthtoken ${token}`,
        },
        method: 'GET',
        cache: 'no-store',
      }
    );
    const responseBody = await response.text();

    if (!response.ok) {
      console.error('Error Response:', responseBody);
      throw new Error(
        `Failed to fetch data from Zoho: ${response.status} ${response.statusText}`
      );
    }

    const data = JSON.parse(responseBody);

    return (
      <div>
        <h1>Zoho Data</h1>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    );
  } catch (error: unknown) {
    const typedError = error as { message: string };
    console.error('Error:', typedError?.message);
    return <div>Error: {typedError.message}</div>;
  }
}
