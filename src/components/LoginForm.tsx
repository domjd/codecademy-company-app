import { useState } from "react";
import { useUserContext } from "../hooks/hooks";
import { Cross1Icon } from "@radix-ui/react-icons";
import Spinner from "./Spinner";

type TLoginFormProps = {
  isVisible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

function LoginForm({ isVisible, setVisible }: TLoginFormProps) {
  const { loginUser, errorMessage, isError, isLoading } = useUserContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const attemptLogin = await loginUser(email, password);

    if (attemptLogin === true) {
      setVisible(false);
      setEmail("");
      setPassword("");
    }
  };
  return (
    <form className={`login_form ${isVisible ? "login_form_visible" : ""}`}>
      <button
        type="button"
        className="drawer_close_button"
        onClick={() => {
          setVisible(false);
          setEmail("");
          setPassword("");
        }}
      >
        <Cross1Icon width="10" height="10" />
      </button>
      {isError && <div className="error">{errorMessage}</div>}
      <h2>Login</h2>
      <div className="form_field">
        <label className="input_label" htmlFor="email">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input_field login_input"
          placeholder="Email Address"
        />
      </div>
      <div className="form_field">
        <label className="input_label" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className="input_field login_input"
          placeholder="Password"
        />
      </div>

      <div className="form_field">
        <button
          type="submit"
          disabled={isLoading}
          onClick={handleLogin}
          className="primary_button"
          id="login_button"
        >
          {isLoading ? <Spinner width={24} height={24} /> : "Login"}
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
