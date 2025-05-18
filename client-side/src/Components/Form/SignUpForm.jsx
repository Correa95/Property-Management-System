function SignUpForm() {
  return (
    <div className="signUpFromContainer">
      <form className="signUpFrom">
        <div className="nameCredential">
          <label>
            User Name
            <input type="text" />
          </label>
          <label>
            Email
            <input type="text" />
          </label>
        </div>
        <div className="passwordCredential">
          <label>
            Password
            <input type="password1" />
          </label>
          <label>
            Confirm Password
            <input type="password2" />
          </label>
        </div>
      </form>
    </div>
  );
}

export default SignUpForm;
