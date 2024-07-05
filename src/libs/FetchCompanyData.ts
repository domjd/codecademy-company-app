import { TCompanyType } from "../types/types";
import { BASE_API_URL } from "./constants";

export const fetchCompanies = async (searchText: string, index: number = 1) => {
  try {
    const response = await fetch(
      `${BASE_API_URL}/search/companies?q=${searchText}&items_per_page=5&start_index=${index}`,
      {
        headers: {
          Authorization: `Basic ${import.meta.env.VITE_API_KEY}==`,
        },
        method: "GET",
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.description);
    }

    const data = await response.json();
    return data.items as TCompanyType[];
  } catch (e) {
    throw new Error();
  }
};

export const fetchFullCompany = async (companyId: string) => {
  const response = await fetch(
    `http://domtestapp.com:3000/company/${companyId}`,
    {
      headers: {
        Authorization: `Basic ${import.meta.env.VITE_API_KEY}==`,
        "Content-Type": "application/json",
      },
      method: "GET",
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.description);
  }

  const data = await response.json();

  return data;
};
