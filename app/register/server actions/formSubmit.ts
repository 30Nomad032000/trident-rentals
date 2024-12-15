'use server';

export type FormState = {
  message: string;
};

export async function onSubmitAction(
  data: FormData,
  token: string,
  type: 'tenant' | 'partner' | 'vendor' | 'landlord'
): Promise<FormState> {
  'use server';
  const formData = Object.fromEntries(data);

  const urls = {
    tenant:
      'https://www.zohoapis.com/creator/v2.1/data/tridentrental/trident-rental/form/Tenant',
    partner:
      'https://www.zohoapis.com/creator/v2.1/data/tridentrental/trident-rental/form/Partner_Registration',
    vendor:
      'https://www.zohoapis.com/creator/v2.1/data/tridentrental/trident-rental/form/Vendor_Registration',
    landlord:
      'https://www.zohoapis.com/creator/v2.1/data/tridentrental/trident-rental/form/Landlord_Registration',
  };

  type UrlKey = keyof typeof urls;

  const generateFetchUrl = (value: UrlKey): string => {
    return urls[value];
  };
  const payload = {
    data: formData,
  };

  try {
    const response = await fetch(generateFetchUrl(type), {
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
    return { message: typedError.message };
  }
}
