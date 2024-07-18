import { useEffect, useState } from "react";
import Drawer from "./components/Drawer";
import Header from "./components/Header";
import ResultsList from "./components/ResultsList";
import SearchForm from "./components/SearchForm";
import UserDrawer from "./components/UserDrawer";
import { useUserContext } from "./hooks/hooks";
import { getUser } from "./libs/Auth";
import Spinner from "./components/Spinner";

function App() {
  const { dispatch } = useUserContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function initializeAuth() {
      setIsLoading(true);
      try {
        console.log("calling from app: ", isLoading);
        const userData = await getUser(dispatch);
        if (userData) {
          console.log("USER DATA: ", userData);
          dispatch({ type: "SET_USER", payload: userData });
          dispatch({ type: "SET_LOGIN_STATUS", payload: true });
        } else {
          dispatch({ type: "CLEAR_USER" });
          dispatch({ type: "SET_LOGIN_STATUS", payload: false });
        }
      } catch (error) {
        console.error("Failed to check auth status:", error);
        dispatch({
          type: "SET_ERROR",
          payload: "Failed to initialize app. Please try again.",
        });
      } finally {
        setIsLoading(false);
      }
    }

    initializeAuth();
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <Spinner width={200} height={200} />
      ) : (
        <>
          <header>
            <Header />
          </header>
          <main>
            {/* User Drawer */}
            <UserDrawer />
            {/* Company Details Drawer */}
            <Drawer />
            {/* Form Section */}
            <SearchForm />

            {/* Results Section */}
            {/* <FollowedCompanies /> */}
            <ResultsList />
          </main>
        </>
      )}
    </>
  );
}

export default App;
