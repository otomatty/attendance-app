export interface CompanyData {
  name: string;
  address: string;
  phone: string;
  adminFirstName: string;
  adminLastName: string;
  adminEmail: string;
  adminPassword: string;
}

export interface Company {
  id: string;
  name: string;
  address: string;
  phone: string;
  created_at: string;
  updated_at: string;
}
