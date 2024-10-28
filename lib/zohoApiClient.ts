import axios from "axios";


export async function generateAccessToken(): Promise<string> {
  try {
    const response = await axios.post<{ access_token: string }>(
      `${process.env.baseAccUrl}/oauth/v2/token`,
      null,
      {
        params: {
          refresh_token:`${process.env.refreshToken}`,
          client_id:`${process.env.clientId}`,
          client_secret:`${process.env.clientSecret}`,
          grant_type: "refresh_token",
        },
      }
    );
    return response.data?.access_token;
  } catch (error) {
    console.error("Error generating access token:", error);
    throw error;
  }
}
