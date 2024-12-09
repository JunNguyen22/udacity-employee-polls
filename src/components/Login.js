import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const getErrorMessage = (id, password) => {
  if (!id || !password) {
    return "Please fill in User and Password.";
  }
  return "Incorrect User or Password, please try again.";
};

const withRouter = (Component) => {
  const ComponentWithRouterProp = (props) => {
    let navigate = useNavigate();
    return <Component {...props} router={{ navigate }} />;
  };

  return ComponentWithRouterProp;
};

const Login = ({ dispatch, router }) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = () => {
    setIsSubmitted(true);
    setErrorMessage(getErrorMessage(id, password));
    if (id && password) {
      dispatch(setAuthedUser({ id, password }));
      router.navigate("/");
    }
  };

  return (
    <div className="login">
      <div className="card title-card">Login</div>
      <div className="card">User</div>
      <input placeholder="User" onChange={(e) => setId(e.target.value)} />
      <div className="card">Password</div>
      <input
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        type="password"
      />
      <div className="card">
        <button
          data-testid="login-submit"
          className="btn"
          onClick={handleSubmit}
        >
          Login
        </button>
      </div>
      {isSubmitted ? (
        <div data-testid="login-error-message" className="error-text card">
          {errorMessage}
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = () => ({});

export default withRouter(connect(mapStateToProps)(Login));

export const forTestings = {
  getErrorMessage,
};
