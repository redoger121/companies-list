export type Company = {
  name: string;
  address: string;
  id: string;
};

export type CompanyState = {
  companies: Company[];
  markedCompanies: string[];
  moksLengh: number;
  companiesLength: number;
};
