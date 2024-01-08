export interface Customer {
  id: number;
  date_created: string;
  date_created_gmt: string;
  date_modified: any;
  date_modified_gmt: any;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  username: string;
  billing: Billing;
  shipping: Shipping;
  is_paying_customer: boolean;
  avatar_url: string;
  meta_data: any[];
  _links: Links;
}

export interface Billing {
  first_name: string;
  last_name: string;
  company?: string | undefined;
  address_1: string;
  address_2?: string | undefined;
  city: string;
  postcode: string;
  country: string;
  state: string;
  email: string;
  phone: string;
}

export interface Shipping {
  first_name: string;
  last_name: string;
  company?: string;
  address_1: string;
  address_2: string;
  city: string;
  postcode: string;
  country: string;
  state: string;
  phone: string;
}

export interface Links {
  self: Self[];
  collection: Collection[];
}

export interface Self {
  href: string;
}

export interface Collection {
  href: string;
}
