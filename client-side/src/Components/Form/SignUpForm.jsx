function SignUpForm() {
  return (
    <div className="signUpFromContainer">
      <form className="signUpFrom">
        <div className="nameCredential">
          <label>
            First Name
            <input type="text" />
          </label>
          <label>
            Last Name
            <input type="text" />
          </label>
          <label>
            Username
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
        </div>
      </form>
    </div>
  );
}

export default SignUpForm;
