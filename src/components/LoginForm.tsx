function LoginForm({ isVisible }) {
  return (
    <div className={`login_form ${isVisible ? "login_form_visible" : ""}`}>
      <div className="error">Error Message</div>
      <div className="form_field">
        <label className="input_label" htmlFor="email">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
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
          className="input_field login_input"
          placeholder="Password"
        />
      </div>

      <div className="form_field">
        <button className="primary_button" id="login_button">
          Login
        </button>
      </div>
    </div>
  );
}

export default LoginForm;
