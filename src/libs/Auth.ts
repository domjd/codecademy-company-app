import { Action } from "../reducers/UserReducer";
import { TLoginRequestBody, TRegisterRequestBody } from "../types/types";
import { BASE_API_URL } from "./constants";
import { fetchFollowedCompanies } from "./FetchCompanyData";

export const register = async (
  registerDetails: TRegisterRequestBody,
  dispatch: React.Dispatch<Action>
) => {
  try {
    dispatch({ type: "SET_LOADING", payload: true });
    const res = await fetch(`${BASE_API_URL}/auth/register`, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true",
      },
      body: JSON.stringify(registerDetails),
    });

    if (!res.ok) {
      console.log(res);
      const errorData = await res.json();
      throw new Error(errorData.message);
    }

    const data = await res.json();
    dispatch({ type: "SET_USER", payload: data });
    dispatch({ type: "SET_LOGIN_STATUS", payload: true });

    console.log(data);
    return data;
  } catch (error) {
    if (error instanceof Error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
      throw error;
    }
  } finally {
    dispatch({ type: "SET_LOADING", payload: false });
  }
};

export const login = async (
  email: string,
  password: string,
  dispatch: React.Dispatch<Action>
) => {
  const reqBody = {
    email: email,
    password: password,
  } as TLoginRequestBody;

  try {
    dispatch({ type: "SET_LOADING", payload: true });
    const res = await fetch(`${BASE_API_URL}/auth/login`, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true",
      },
      body: JSON.stringify(reqBody),
    });
    if (!res.ok) {
      console.log(res);
      const errorData = await res.json();
      throw new Error(errorData.message);
    }

    const data = await res.json();

    console.log(data);

    if (data.user) {
      dispatch({ type: "SET_USER", payload: data.user });
      dispatch({ type: "SET_LOGIN_STATUS", payload: true });
      await fetchFollowedCompanies(dispatch);
    }

    dispatch({ type: "SET_LOADING", payload: false });
    return data;
  } catch (error) {
    console.log("ERROR");

    if (error instanceof Error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
    return null;
  } finally {
    dispatch({ type: "SET_LOADING", payload: false });
  }
};

export const logout = async () => {
  const res = await fetch(`${BASE_API_URL}/auth/logout`, {
    method: "GET",
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": "true",
    },
  });
  if (!res.ok) {
    console.log(res);
    const errorData = await res.json();
    return errorData;
  }

  const data = await res.json();

  console.log(data);
  return data;
};

export const getUser = async (dispatch: React.Dispatch<Action>) => {
  try {
    console.log("getting user");
    const response = await fetch(`${BASE_API_URL}/user/details`, {
      method: "GET",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.statusMessage);
    }
    const data = await response.json();
    await fetchFollowedCompanies(dispatch);
    console.log(data);

    return data;
  } catch (e) {
    return null;
  }
};
