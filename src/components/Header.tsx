import React, { useState } from "react";
import PrimaryButton from "./PrimaryButton";
import LoginForm from "./LoginForm";

function Header() {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
      <nav className="nav">
        <p>Company Search</p>
        <div className="nav_links">
          <PrimaryButton
            onClick={() => {
              setShowLogin(true);
            }}
          >
            Login
          </PrimaryButton>
          <PrimaryButton onClick={() => {}}>Register</PrimaryButton>
        </div>
      </nav>
      <LoginForm isVisible={showLogin} />
    </>
  );
}

export default Header;
