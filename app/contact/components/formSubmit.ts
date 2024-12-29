'use server';

export type FormState = {
  message: string;
};

// Handles form submission by sending data to Zoho Creator API
export async function onSubmitAction(
  data: FormData,
  token: string
): Promise<FormState> {
  'use server';

  const formData = Object.fromEntries(data); // Convert FormData to a plain object
  const url =
    'https://www.zohoapis.com/creator/v2.1/data/tridentrental/trident-rental/form/Contact_Us';

  const payload = {
    data: formData,
  };

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Zoho-oauthtoken ${token}`, // Authorization with OAuth token
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(payload),
    });
    const res = await response.json();
    console.log(res); // Log response for debugging
    return res;
  } catch (e: unknown) {
    const typedError = e as { message: string };
    return { message: typedError.message };
  }
}
