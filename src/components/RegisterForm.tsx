import { useState } from "react";
import { useUserContext } from "../hooks/hooks";
import { Cross1Icon } from "@radix-ui/react-icons";
import Spinner from "./Spinner";
import { TRegisterRequestBody } from "../types/types";

type TLoginFormProps = {
  isVisible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

function RegisterForm({ isVisible, setVisible }: TLoginFormProps) {
  const { registerUser, errorMessage, isError, isLoading } = useUserContext();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const attemptRegister = await registerUser({
      email,
      password,
      firstName,
      lastName,
    } as TRegisterRequestBody);

    console.log(attemptRegister);

    if (attemptRegister === true) {
      setVisible(false);
      setEmail("");
      setPassword("");
      setFirstName("");
      setLastName("");
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
          setFirstName("");
          setLastName("");
        }}
      >
        <Cross1Icon width="10" height="10" />
      </button>
      {isError && <div className="error">{errorMessage}</div>}
      <h2>Register</h2>
      <div className="form_field">
        <label className="input_label" htmlFor="firstname">
          First Name
        </label>
        <input
          type="text"
          id="firstname"
          name="firstname"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="input_field login_input"
          placeholder="First Name"
        />
      </div>
      <div className="form_field">
        <label className="input_label" htmlFor="lastname">
          First Name
        </label>
        <input
          type="text"
          id="lastname"
          name="lastname"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="input_field login_input"
          placeholder="Last Name"
        />
      </div>
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
          onClick={handleRegister}
          className="primary_button"
          id="login_button"
        >
          {isLoading ? <Spinner width={24} height={24} /> : "Register"}
        </button>
      </div>
    </form>
  );
}

export default RegisterForm;
