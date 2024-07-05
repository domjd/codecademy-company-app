import { TCompanyStateType, TCompanyType } from "../types/types";

export const intialState: TCompanyStateType = {
  activeId: "",
  searchTerm: "",
  index: 0,
  currentPage: 1,
  companies: [],
  isLoading: false,
};

export type Action =
  | { type: "SET_SEARCH_TERM"; payload: string }
  | { type: "SET_COMPANIES"; payload: TCompanyType[] }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ACTIVE_ID"; payload: string }
  | { type: "SET_CURRENT_PAGE"; payload: number }
  | { type: "SET_INDEX"; payload: number };

export const CompanyReducer = (state: TCompanyStateType, action: Action) => {
  switch (action.type) {
    case "SET_COMPANIES":
      return {
        ...state,
        companies:
          state.index >= 5
            ? [...state.companies, ...action.payload]
            : action.payload,
      };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_ACTIVE_ID":
      return { ...state, activeId: action.payload };
    case "SET_SEARCH_TERM":
      return { ...state, searchTerm: action.payload };
    case "SET_INDEX":
      return { ...state, index: action.payload };
    case "SET_CURRENT_PAGE":
      return { ...state, currentPage: action.payload };
    default:
      return state;
  }
};
