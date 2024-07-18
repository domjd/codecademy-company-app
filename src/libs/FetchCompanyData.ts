import { Action as UserAction } from "../reducers/UserReducer";
import { Action as CompanyAction } from "../reducers/CompanyReducer";
import { TCompanyType, TFollowedCompanyResponse } from "../types/types";
import { BASE_COMPANIES_API_URL } from "./constants";

export const fetchCompanies = async (index: number = 0, searchText: string) => {
  try {
    const response = await fetch(
      `${BASE_COMPANIES_API_URL}/search/companies?q=${searchText}&items_per_page=5&start_index=${index}`,
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

    await new Promise((resolve) => setTimeout(resolve, 500));

    const data = await response.json();

    console.log(data);
    return data;
  } catch (e) {
    throw new Error();
  }
};

export const fetchFullCompany = async (
  companyId: string,
  dispatch: React.Dispatch<CompanyAction>
) => {
  dispatch({ type: "SET_COMPANY_LOADING", payload: true });
  try {
    const response = await fetch(
      `http://domtestapp.com:3000/company/${companyId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.description);
    }

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const data = await response.json();

    return data;
  } catch (e) {
    dispatch({ type: "SET_COMPANY_LOADING", payload: false });
    if (e instanceof Error) {
      throw e;
    }
  } finally {
    dispatch({ type: "SET_COMPANY_LOADING", payload: false });
  }
};

export const fetchFollowedCompanies = async (
  dispatch: React.Dispatch<UserAction>
) => {
  try {
    const response = await fetch(
      `http://domtestapp.com:3000/user/mine/followedcompanies`,
      {
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": "true",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.description);
    }

    await new Promise((resolve) => setTimeout(resolve, 500));

    const data = await response.json();

    // const companyData = data.map(async (company: TFollowedCompanyResponse) => {
    //   const fullData = await fetchCompanies(0, company.company_id);
    //   return fullData.items[0];
    // }) as TCompanyType[];

    const companyData = await Promise.all(
      data.map(async (company: TFollowedCompanyResponse) => {
        const fullData = await fetchCompanies(0, company.company_id);
        return fullData.items[0];
      }) as TCompanyType[]
    );

    console.log(companyData);
    dispatch({ type: "SET_FOLLOWED_COMPANIES", payload: companyData });
    //return companyData;
  } catch (e) {
    throw new Error();
  }
};

export const addFollowedCompany = async (
  company: TCompanyType,
  dispatch: React.Dispatch<UserAction>
) => {
  dispatch({ type: "SET_LOADING", payload: true });
  dispatch({ type: "ADD_FOLLOWED_COMPANY", payload: company });
  console.log("ADDING COMPANY: ", company);
  try {
    const response = await fetch(
      `http://domtestapp.com:3000/user/mine/addfollowedcompanies`,
      {
        method: "POST",
        body: JSON.stringify({ companyId: company.company_number }),
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": "true",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.description);
    }

    const data = await response.json();

    console.log(data);
    //dispatch({ type: "SET_FOLLOWED_COMPANIES", payload: data });
  } catch (e) {
    dispatch({
      type: "REMOVE_FOLLOWED_COMPANY",
      payload: company.company_number,
    });
    dispatch({ type: "SET_LOADING", payload: false });
    throw new Error();
  } finally {
    dispatch({ type: "SET_LOADING", payload: false });
  }
};

export const removeFollowedCompany = async (
  company: TCompanyType,
  dispatch: React.Dispatch<UserAction>
) => {
  dispatch({ type: "SET_LOADING", payload: true });
  dispatch({
    type: "REMOVE_FOLLOWED_COMPANY",
    payload: company.company_number,
  });
  try {
    const response = await fetch(
      `http://domtestapp.com:3000/user/mine/removefollowedcompanies`,
      {
        method: "DELETE",
        body: JSON.stringify({ companyId: company.company_number }),
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": "true",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.description);
    }

    const data = await response.json();

    console.log(data);
    //dispatch({ type: "SET_FOLLOWED_COMPANIES", payload: data });
  } catch (e) {
    dispatch({
      type: "ADD_FOLLOWED_COMPANY",
      payload: company,
    });
    dispatch({ type: "SET_LOADING", payload: false });
    throw new Error();
  } finally {
    dispatch({ type: "SET_LOADING", payload: false });
  }
};
