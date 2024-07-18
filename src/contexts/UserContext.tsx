import React, { createContext, useCallback, useReducer, useState } from "react";
import { TCompanyType, TRegisterRequestBody, TUser } from "../types/types";
import { login, logout, register } from "../libs/Auth";
import {
  addFollowedCompany,
  removeFollowedCompany,
} from "../libs/FetchCompanyData";
import { Action, intialUserState, userReducer } from "../reducers/UserReducer";

type TUserContext = {
  user: TUser | null;
  dispatch: React.Dispatch<Action>;
  followedCompanies: TCompanyType[] | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  isError: boolean;
  errorMessage: string;
  userDrawerOpen: boolean;
  handleUserDrawerChange: (status: boolean) => void;
  loginUser: (email: string, password: string) => Promise<boolean>;
  registerUser: (registerDetails: TRegisterRequestBody) => Promise<boolean>;
  logoutUser: () => Promise<boolean>;
  handleAddFollowedCompany: (company: TCompanyType) => void;
  handleRemoveFollowedCompany: (company: TCompanyType) => void;
};

export const UserContext = createContext<TUserContext | null>(null);

function UserContextProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(userReducer, intialUserState);
  const [userDrawerOpen, setUserDrawerOpen] = useState(false);

  const handleUserDrawerChange = (status: boolean) => {
    setUserDrawerOpen(status);
  };

  const loginUser = async (email: string, password: string) => {
    console.log("ATTEMTING LOGIN");
    const attemptLogin = await login(email, password, dispatch);
    console.log("CONTEXT: ", attemptLogin);
    if (attemptLogin.user) {
      //setLoggedInUser();
      dispatch({ type: "CLEAR_ERROR" });
      return true;
    } else {
      console.log("AUTH FAILED");
      return false;
    }
  };

  const logoutUser = useCallback(async () => {
    const attemptLogout = await logout();
    console.log("CONTEXT: ", attemptLogout);
    if (attemptLogout.logoutSuccessful) {
      dispatch({ type: "CLEAR_USER" });
      dispatch({ type: "CLEAR_ERROR" });
      dispatch({ type: "SET_LOGIN_STATUS", payload: false });
      return true;
    } else {
      dispatch({ type: "SET_ERROR", payload: attemptLogout.message });
      return false;
    }
  }, [dispatch]);

  const registerUser = async (registerDetails: TRegisterRequestBody) => {
    const attemptRegister = await register(registerDetails, dispatch);
    if (attemptRegister) {
      return true;
    }

    return false;
  };

  const handleAddFollowedCompany = async (company: TCompanyType) => {
    try {
      await addFollowedCompany(company, dispatch);
    } catch (e) {
      throw new Error();
    }
  };

  const handleRemoveFollowedCompany = async (company: TCompanyType) => {
    try {
      await removeFollowedCompany(company, dispatch);
    } catch (e) {
      throw new Error();
    }
  };

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        dispatch,
        isLoading: state.isLoading,
        isError: state.isError,
        errorMessage: state.errorMessage,
        isLoggedIn: state.isLoggedIn,
        handleAddFollowedCompany,
        handleRemoveFollowedCompany,
        loginUser,
        registerUser,
        logoutUser,
        followedCompanies: state.followedCompanies,
        userDrawerOpen,
        handleUserDrawerChange,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
