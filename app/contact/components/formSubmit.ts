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

  const payload = {
    data: formData,
  };

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Zoho-oauthtoken ${token}`,
      },
      method: 'POST',
      body: JSON.stringify(payload),
    });
    const res = await response.json();
    return res;
  } catch (e: unknown) {
    const typedError = e as { message: string };
    console.log(typedError?.message);
    return { message: typedError.message };
  }
}
