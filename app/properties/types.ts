export type ZohoData = {
  code: number;
  data: Property[];
};

type PropertyImage = {
  Upload_your_Image_here: string; // URL to the image
  ID: string; // Image ID
  zc_display_value: string; // Display value (URL to the image)
};

type PropertyAddress = {
  latitude: string; // Latitude of the property address
  address_line_1: string; // Address line 1
  address_line_2: string; // Address line 2
  zc_display_value: string; // Display value for the full address
  longitude: string; // Longitude of the property address
};

export type Property = {
  Number_Of_Bathrooms: string; // Number of bathrooms (stringified float)
  Rent_Amount: string; // Rent amount (string, empty if not available)
  Property_Size: string; // Property size (string, likely in square feet)
  ID: string; // Unique property ID
  Property_Image1: PropertyImage[]; // Array of property images
  Number_Of_Bedrooms: string; // Number of bedrooms (stringified int)
  Property_Name: string; // Name of the property
  Property_Address: PropertyAddress; // Address object for the property
};
