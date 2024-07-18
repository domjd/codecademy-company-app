import { RESULTS_PER_PAGE } from "../libs/constants";
import { TCompanyStateType, TCompanyType } from "../types/types";

export const intialState: TCompanyStateType = {
  activeId: "",
  searchTerm: "",
  index: 0,
  currentPage: 1,
  companies: [],
  totalResults: 0,
  isResultsLoading: false,
  isCompanyLoading: false,
};

export type Action =
  | { type: "SET_SEARCH_TERM"; payload: string }
  | { type: "SET_COMPANIES"; payload: TCompanyType[] }
  | { type: "SET_RESULTS_LOADING"; payload: boolean }
  | { type: "SET_COMPANY_LOADING"; payload: boolean }
  | { type: "SET_ACTIVE_ID"; payload: string }
  | { type: "SET_TOTAL_RESULTS"; payload: number }
  | { type: "SET_CURRENT_PAGE"; payload: number }
  | { type: "RESET_INDEX" }
  | { type: "INCREMENT_INDEX" };

export const companyReducer = (state: TCompanyStateType, action: Action) => {
  switch (action.type) {
    case "SET_COMPANIES":
      return {
        ...state,
        companies:
          state.index >= 5
            ? [...state.companies, ...action.payload]
            : action.payload,
      };
    case "SET_RESULTS_LOADING":
      return { ...state, isResultsLoading: action.payload };
    case "SET_COMPANY_LOADING":
      return { ...state, isCompanyLoading: action.payload };
    case "SET_ACTIVE_ID":
      return { ...state, activeId: action.payload };
    case "SET_TOTAL_RESULTS":
      return { ...state, totalResults: action.payload };
    case "SET_SEARCH_TERM":
      return { ...state, searchTerm: action.payload };
    case "RESET_INDEX":
      return { ...state, index: 0 };
    case "INCREMENT_INDEX":
      return { ...state, index: state.index + RESULTS_PER_PAGE };
    case "SET_CURRENT_PAGE":
      return { ...state, currentPage: action.payload };
    default:
      return state;
  }
};
