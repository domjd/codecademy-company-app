export type TCompanyStateType = {
  activeId: string;
  searchTerm: string;
  companies: TCompanyType[];
  isResultsLoading: boolean;
  isCompanyLoading: boolean;
  index: number;
  currentPage: number;
  totalResults: number;
};

export type TFollowedCompanyResponse = {
  id: number;
  user_id: number;
  company_id: string;
};

export type TCompanyType = {
  title: string;
  company_name: string;
  company_number: string;
  address_snippet: string;
};

export type TCompanyTypeExpanded = TCompanyType & {
  company_status: string;
  type: string;
  sic_codes: string[];
  date_of_creation: string;
  date_of_cessation: string;
  registered_office_address: TRegisteredAddress;
};

export type TRegisteredAddress = {
  address_line_1: string;
  address_line_2: string;
  locality: string;
  region: string;
  postal_code: string;
  country: string;
};

export type Classification = {
  description: string;
  type: string;
};

export type PersonsEntitled = {
  name: string;
};

export type TCharges = {
  acquired_on: string;
  charge_number: string;
  classification: Classification;
  covering_instrument_date: string;
  created_on: string;
  delivered_on: string;
  id: string;
  persons_entitled: PersonsEntitled[];
  resolved_on: string;
  satisfied_on: string;
  secured_details: Classification[];
  status: string;
};

export type Address = {
  address_line_1: string;
  address_line_2: string;
  care_of: string;
  country: string;
  locality: string;
  po_box: string;
  postal_code: string;
  premises: string;
  region: string;
};

export type DateOfBirth = {
  day: string;
  month: string;
  year: string;
};

export type TOfficer = {
  address: Address;
  appointed_before: string;
  appointed_on: string;
  country_of_residence: string;
  date_of_birth: DateOfBirth;
  name: string;
  nationality: string;
  occupation: string;
  officer_role: string;
  person_number: string;
  resigned_on: string;
  responsibilities: string;
};

export type TFullCompany = {
  companyDetails: TCompanyTypeExpanded;
  companyCharges: TCharges[];
  companyOfficers: TOfficer[];
};

export type TLoginRequestBody = {
  email: string;
  password: string;
};

export type TRegisterRequestBody = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type TUser = {
  email: string;
  firstName: string;
  lastName: string;
};

export type TUserState = {
  user: TUser | null;
  followedCompanies: TCompanyType[];
  isLoggedIn: boolean;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
};
