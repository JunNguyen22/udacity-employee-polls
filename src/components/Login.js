import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import { useState } from "react";

const getErrorMessage = (id, password) => {
  if (!id || !password) {
    return "Please fill in User and Password.";
  }
  return "Incorrect User or Password, please try again.";
};

const Login = ({ dispatch }) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = () => {
    setIsSubmitted(true);
    setErrorMessage(getErrorMessage(id, password));
    if (id && password) {
    }
    dispatch(setAuthedUser({ id, password }));
  };

  return (
    <div className="login">
      <div className="card title-card">Login</div>
      <div className="card">User</div>
      <input onChange={(e) => setId(e.target.value)} />
      <div className="card">Password</div>
      <input onChange={(e) => setPassword(e.target.value)} type="password" />
      <div className="card">
        <button className="btn" onClick={handleSubmit}>
          Login
        </button>
      </div>
      {isSubmitted ? (
        <div className="error-text card">{errorMessage}</div>
      ) : null}
    </div>
  );
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(Login);
