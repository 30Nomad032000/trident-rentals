'use server';

export type FormState = {
  message: string;
};

export async function onSubmitAction(
  data: FormData,
  token: string
): Promise<FormState> {
  'use server';
  const formData = Object.fromEntries(data);
  const url =
    'https://www.zohoapis.in/creator/v2.1/data/demo13cloudq/trident-data-demo/form/Contact_Us';

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Zoho-oauthtoken ${token}`,
      },
      method: 'POST',
      cache: 'no-store',
      body: JSON.stringify(formData),
    });

    console.log(response);
  } catch (e: unknown) {
    const typedError = e as { message: string };
    console.log(typedError?.message);
  }

  return { message: 'User registered' };
}
