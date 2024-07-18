import { TCompanyType, TUser, TUserState } from "../types/types";

export const intialUserState: TUserState = {
  user: null,
  followedCompanies: [],
  isLoading: false,
  isLoggedIn: false,
  isError: false,
  errorMessage: "",
};

export type Action =
  | { type: "SET_USER"; payload: TUser }
  | { type: "CLEAR_USER" }
  | { type: "SET_ERROR"; payload: string }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_FOLLOWED_COMPANIES"; payload: TCompanyType[] }
  | { type: "ADD_FOLLOWED_COMPANY"; payload: TCompanyType }
  | { type: "REMOVE_FOLLOWED_COMPANY"; payload: string }
  | { type: "CLEAR_ERROR" }
  | { type: "SET_LOGIN_STATUS"; payload: boolean };

export const userReducer = (state: TUserState, action: Action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    case "CLEAR_USER":
      return { ...state, user: null };
    case "SET_ERROR":
      return { ...state, isError: true, errorMessage: action.payload };
    case "CLEAR_ERROR":
      return { ...state, isError: false, errorMessage: "" };
    case "SET_LOGIN_STATUS":
      return { ...state, isLoggedIn: action.payload };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_FOLLOWED_COMPANIES":
      return { ...state, followedCompanies: action.payload };
    case "ADD_FOLLOWED_COMPANY":
      return {
        ...state,
        followedCompanies: state.followedCompanies
          ? [...state.followedCompanies, action.payload]
          : [],
      };
    case "REMOVE_FOLLOWED_COMPANY":
      return {
        ...state,
        followedCompanies: state.followedCompanies?.filter(
          (c) => c.company_number !== action.payload
        ),
      };
    default:
      return state;
  }
};
