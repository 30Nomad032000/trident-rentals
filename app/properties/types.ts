export type ZohoData = {
    code: number;
    data: Property[];
  };
  
  type Property = {
    No_of_Bathroom: string;
    No_Of_Bedroom: string;
    Property_Images: PropertyImage[];
    ID: string;
    Sq_Feet: string;
    Property_Name: string;
    Property_Address: PropertyAddress;
    Price:string;
  };
  
  type PropertyImage = {
    ID: string;
    Image: string;
    zc_display_value: string;
  };
  
  type PropertyAddress = {
    country: string;
    district_city: string;
    latitude: string;
    address_line_1: string;
    state_province: string;
    address_line_2: string;
    postal_code: string;
    zc_display_value: string;
    longitude: string;
  };
  