import { useContext, useEffect, useState } from "react";
import { CompanyContext } from "../contexts/CompanyContext";

import { TFullCompany } from "../types/types";
import { fetchCompanies, fetchFullCompany } from "../libs/FetchCompanyData";
import { UserContext } from "../contexts/UserContext";
import { Action } from "../reducers/CompanyReducer";

//-------------------Company Hooks----------------------------------

export function useCompany(
  companyId: string,
  dispatch: React.Dispatch<Action>
) {
  const [company, setCompany] = useState<TFullCompany>();

  useEffect(() => {
    if (!companyId) return;
    const fetchData = async () => {
      try {
        const data = await fetchFullCompany(companyId, dispatch);
        console.log("loading company");
        setCompany(data);
      } catch (e) {
        throw new Error();
      }
    };

    fetchData();
  }, [companyId, dispatch]);

  return company;
}

export function useSearchQuery(searchText: string) {
  const { dispatch } = useCompaniesContext();

  // const handleIndexChange = async () => {
  //   try {
  //     dispatch({ type: "SET_LOADING", payload: true });

  //     const data = await fetchCompanies(state.index, searchText);

  //     dispatch({ type: "SET_TOTAL_RESULTS", payload: data.total_results });

  //     dispatch({ type: "SET_COMPANIES", payload: data.items });
  //   } catch (e) {
  //     throw new Error();
  //   } finally {
  //     dispatch({ type: "INCREMENT_INDEX" });
  //     console.log(state.index);

  //     dispatch({ type: "SET_LOADING", payload: false });
  //   }
  // };

  useEffect(() => {
    if (!searchText) return;
    const fetchData = async () => {
      try {
        dispatch({ type: "SET_RESULTS_LOADING", payload: true });
        dispatch({ type: "RESET_INDEX" });
        dispatch({ type: "SET_CURRENT_PAGE", payload: 1 });
        const data = await fetchCompanies(0, searchText);

        dispatch({ type: "SET_TOTAL_RESULTS", payload: data.total_results });

        dispatch({ type: "SET_COMPANIES", payload: data.items });
      } catch (e) {
        throw new Error();
      } finally {
        dispatch({ type: "INCREMENT_INDEX" });
        dispatch({ type: "SET_RESULTS_LOADING", payload: false });
      }
    };

    fetchData();
  }, [dispatch, searchText]);
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

//-----------------User Hooks----------------------------------

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("User Context must be used within UserContextProvider");
  }

  return context;
}

//----------------Helper Hooks-----------------------------------------

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
