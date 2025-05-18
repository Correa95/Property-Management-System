function UserRegisterForm() {
  return (
    <div className="userRegisterFormContainer">
      <form className="userRegisterForm">
        <div className="usernames">
          <label>
            First Name
            <input type="text" />
          </label>
          <label>
            Last Name
            <input type="text" />
          </label>
        </div>
      </form>
    </div>
  );
}

export default UserRegisterForm;
