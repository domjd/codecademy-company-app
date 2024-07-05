import { useContext, useEffect, useState } from "react";
import { CompanyContext } from "../contexts/CompanyContext";

import { TFullCompany } from "../types/types";
import { fetchCompanies, fetchFullCompany } from "../libs/FetchCompanyData";

export function useCompany(companyId: string) {
  const [company, setCompany] = useState<TFullCompany>();

  useEffect(() => {
    if (!companyId) return;
    const fetchData = async () => {
      try {
        const data = await fetchFullCompany(companyId);
        setCompany(data);
      } catch (e) {
        throw new Error();
      }
    };

    fetchData();
  }, [companyId]);

  return company;
}

export function useSearchQuery(searchText: string) {
  const { state, dispatch } = useCompaniesContext();

  useEffect(() => {
    if (!searchText) return;
    const fetchData = async () => {
      try {
        dispatch({ type: "SET_LOADING", payload: true });
        const data = await fetchCompanies(searchText, state.index);

        dispatch({ type: "SET_COMPANIES", payload: data });
      } catch (e) {
        throw new Error();
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };

    fetchData();
  }, [dispatch, searchText, state.index]);
}

export function useCompaniesContext() {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error(
      "Company Context must be used within CompanyContextProvider"
    );
  }

  return context;
}

export function useDebounce<T>(value: T, delay?: number): T {
  const [debounceValue, setDebouceValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouceValue(value), delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debounceValue;
}
