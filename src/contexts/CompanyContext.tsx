import { createContext, useReducer, useState } from "react";
import { TCompanyStateType, TCompanyType, TFullCompany } from "../types/types";
import {
  Action,
  CompanyReducer,
  intialState,
} from "../reducers/CompanyReducer";
import { useCompany, useDebounce } from "../hooks/hooks";
import { RESULTS_PER_PAGE } from "../libs/constants";

type TCompanyContext = {
  state: TCompanyStateType;
  dispatch: React.Dispatch<Action>;
  companiesSliced: TCompanyType[];
  debouncedSearchText: string;
  fullCompany: TFullCompany | undefined;
  drawerOpen: boolean;
  handleDrawerChange: (companyNumber?: string) => void;
  handlePageChange: (direction: "next" | "previous") => void;
};

export const CompanyContext = createContext<TCompanyContext | null>(null);

function CompanyContextProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(CompanyReducer, intialState);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const fullCompany = useCompany(state.activeId);
  const debouncedSearchText = useDebounce(state.searchTerm, 1000);

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

  const handlePageChange = (direction: "next" | "previous") => {
    if (direction === "next") {
      dispatch({ type: "SET_CURRENT_PAGE", payload: state.currentPage + 1 });
      if (RESULTS_PER_PAGE * state.currentPage >= state.index) {
        dispatch({
          type: "SET_INDEX",
          payload: state.index + RESULTS_PER_PAGE,
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
        drawerOpen,
        fullCompany,
        handlePageChange,
        handleDrawerChange,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
}

export default CompanyContextProvider;
