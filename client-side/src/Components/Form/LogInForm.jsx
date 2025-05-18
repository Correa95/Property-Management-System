function LogInForm() {
  return (
    <div className="loginFormContainer">
      <form className="loginForm">
        <label>
          User Name
          <input type="text" />
        </label>
        <label>
          Password
          <input type="password" />
        </label>
      </form>
    </div>
  );
}

export default LogInForm;
