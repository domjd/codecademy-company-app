const dummyData = {
  last_full_members_list_date: "2016-05-16",
  date_of_creation: "2012-05-16",
  sic_codes: ["64999"],
  has_been_liquidated: false,
  status: "active",
  company_name: "NEW HORIZON FINANCE LTD",
  undeliverable_registered_office_address: false,
  registered_office_address: {
    region: "Middlesex",
    locality: "Harrow",
    address_line_1: "137 Harrow View",
    postal_code: "HA1 4SX",
  },
  company_number: "08071525",
  jurisdiction: "england-wales",
  accounts: {
    last_accounts: {
      period_end_on: "2017-05-31",
      made_up_to: "2017-05-31",
    },
    accounting_reference_date: {
      day: "31",
      month: "05",
    },
  },
  type: "ltd",
  has_insolvency_history: false,
  etag: "a3b056e878fd543e863699fe0674dd0ee3ac34c1",
  company_status: "dissolved",
  has_charges: false,
  links: {
    self: "/company/08071525",
    filing_history: "/company/08071525/filing-history",
    officers: "/company/08071525/officers",
    persons_with_significant_control:
      "/company/08071525/persons-with-significant-control",
  },
  registered_office_is_in_dispute: false,
  date_of_cessation: "2018-05-22",
  can_file: false,
};

export const dummyDataFormatted = {
  company_name: dummyData.company_name,
  status: dummyData.status,
  company_type: dummyData.type,
  sic_code: dummyData.sic_codes[0],
  date_of_creation: dummyData.date_of_creation,
  date_of_cessation: dummyData.date_of_cessation,
};
