import { createContext, useReducer, useState } from "react";
import { TCompanyStateType, TCompanyType, TFullCompany } from "../types/types";
import { useCompany, useDebounce } from "../hooks/hooks";
import { RESULTS_PER_PAGE } from "../libs/constants";
import {
  Action,
  companyReducer,
  intialState,
} from "../reducers/CompanyReducer";
import { fetchCompanies } from "../libs/FetchCompanyData";

type TCompanyContext = {
  state: TCompanyStateType;
  dispatch: React.Dispatch<Action>;
  companiesSliced: TCompanyType[];
  debouncedSearchText: string;
  totalPages: number;
  activeCompany: TFullCompany | undefined;
  drawerOpen: boolean;
  handleDrawerChange: (companyNumber?: string) => void;
  handlePageChange: (direction: "next" | "previous") => void;
};

export const CompanyContext = createContext<TCompanyContext | null>(null);

function CompanyContextProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(companyReducer, intialState);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const activeCompany = useCompany(state.activeId, dispatch);
  const debouncedSearchText = useDebounce(state.searchTerm, 1000);
  const totalPages = state.totalResults / RESULTS_PER_PAGE;

  const companiesSliced = [...state.companies].slice(
    RESULTS_PER_PAGE * state.currentPage - RESULTS_PER_PAGE,
    RESULTS_PER_PAGE * state.currentPage
  );

  const handleDrawerChange = async (companyNumber?: string) => {
    if (companyNumber) {
      dispatch({ type: "SET_ACTIVE_ID", payload: companyNumber });
      setDrawerOpen(true);
    } else {
      setDrawerOpen(false);
    }
  };

  const handlePageChange = async (direction: "next" | "previous") => {
    if (direction === "next") {
      if (RESULTS_PER_PAGE * state.currentPage >= state.index) {
        try {
          dispatch({ type: "SET_RESULTS_LOADING", payload: true });
          dispatch({
            type: "SET_CURRENT_PAGE",
            payload: state.currentPage + 1,
          });

          const data = await fetchCompanies(state.index, debouncedSearchText);

          dispatch({ type: "SET_TOTAL_RESULTS", payload: data.total_results });

          dispatch({ type: "SET_COMPANIES", payload: data.items });
        } catch (e) {
          throw new Error();
        } finally {
          dispatch({ type: "INCREMENT_INDEX" });

          dispatch({ type: "SET_RESULTS_LOADING", payload: false });
        }
      } else {
        dispatch({
          type: "SET_CURRENT_PAGE",
          payload: state.currentPage + 1,
        });
      }
    } else if (direction === "previous") {
      dispatch({ type: "SET_CURRENT_PAGE", payload: state.currentPage - 1 });
    }
  };

  return (
    <CompanyContext.Provider
      value={{
        state,
        dispatch,
        companiesSliced,
        debouncedSearchText,
        totalPages,
        drawerOpen,
        activeCompany,
        handlePageChange,
        handleDrawerChange,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
}

export default CompanyContextProvider;
