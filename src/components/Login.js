import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import { useState } from "react";

const getErrorMessage = (id, password) => {
  let message = "Incorrect User or Password, please try again.";
  if (!id || !password) {
    message = "Please fill in User and Password.";
  }
  return message;
};

const Login = ({ dispatch, authedUser }) => {
  console.log({ authedUser });
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <div>
      <div>Login</div>
      <div>User</div>
      <input onChange={(e) => setId(e.target.value)} />
      <div>Password</div>
      <input onChange={(e) => setPassword(e.target.value)} type="password" />
      <div>
        <button
          onClick={() => {
            setIsSubmitted(true);
            setErrorMessage(getErrorMessage(id, password));
            dispatch(
              setAuthedUser({ id: "sarahedo", password: "password123" })
            );
          }}
        >
          Login
        </button>
      </div>
      {isSubmitted ? <div>{errorMessage}</div> : null}
    </div>
  );
};

const mapStateToProps = ({ authedUser }) => ({ authedUser });

export default connect(mapStateToProps)(Login);
