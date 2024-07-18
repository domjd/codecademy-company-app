import { useState } from "react";
import PrimaryButton from "./PrimaryButton";
import LoginForm from "./LoginForm";
import { useUserContext } from "../hooks/hooks";
import { ArchiveIcon } from "@radix-ui/react-icons";
import RegisterForm from "./RegisterForm";

function Header() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const { user, logoutUser, isLoggedIn, handleUserDrawerChange } =
    useUserContext();

  return (
    <>
      <nav className="nav">
        <p>Company Search</p>
        <div className="nav_links">
          <PrimaryButton
            onClick={() => {
              isLoggedIn ? logoutUser() : setShowLogin(true);
            }}
          >
            {isLoggedIn ? user?.email : "Login"}
          </PrimaryButton>
          {!isLoggedIn && (
            <PrimaryButton onClick={() => setShowRegister(true)}>
              Register
            </PrimaryButton>
          )}
          {isLoggedIn && (
            <PrimaryButton onClick={() => handleUserDrawerChange(true)}>
              <ArchiveIcon />
            </PrimaryButton>
          )}
        </div>
      </nav>
      {showLogin ? (
        <LoginForm isVisible={showLogin} setVisible={setShowLogin} />
      ) : (
        ""
      )}
      {showRegister ? (
        <RegisterForm isVisible={showRegister} setVisible={setShowRegister} />
      ) : (
        ""
      )}
    </>
  );
}

export default Header;
