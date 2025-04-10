
export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  storeName: string;
  ownerName: string;
  email: string;
  password: string;
  masterKey: string;
  logo?: File | null;
}

export interface StoreData {
  id: string;
  name: string;
  owner_name: string;
  logo_url?: string | null;
}
