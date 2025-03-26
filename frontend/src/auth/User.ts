export type User = {
  id: string;
  aud: string;
  email?: string;
  phone?: string;
  app_metadata: {
    provider?: string;
    [key: string]: any;
  };
  user_metadata: {
    first_name?: string;
    last_name?: string;
    role?: string;
    address?: string;
    phone?: string;
  };
  created_at: string;
  updated_at?: string;
};

export type UserData = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  discount: string;
  passenger_type: string;
};
