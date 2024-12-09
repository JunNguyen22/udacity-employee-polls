import { useState } from "react";
import { connect } from "react-redux";
import { handleAddQuestion } from "../actions/questions";
import { useNavigate } from "react-router-dom";

const getErrorMessage = (setOptionOneText, setOptionTwoText) => {
  if (!setOptionOneText || !setOptionTwoText) {
    return "Please fill in First Option and Second Option.";
  }
  return "";
};

const withRouter = (Component) => {
  const ComponentWithRouterProp = (props) => {
    let navigate = useNavigate();
    return <Component {...props} router={{ navigate }} />;
  };

  return ComponentWithRouterProp;
};

const NewQuestion = ({ dispatch, router }) => {
  const [optionOneText, setOptionOneText] = useState("");
  const [optionTwoText, setOptionTwoText] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = ({ navigate }) => {
    setIsSubmitted(true);
    setErrorMessage(getErrorMessage(optionOneText, optionTwoText));
    if ((optionOneText, optionTwoText)) {
      dispatch(handleAddQuestion(optionOneText, optionTwoText));
      navigate("/");
    }
  };

  return (
    <div className="newQuestion">
      <div className="card title-card-no-background">Would you rather</div>
      <div className="card">Create Your Own Poll</div>
      <div className="card">First Option</div>
      <input
        placeholder="First option"
        onChange={(e) => setOptionOneText(e.target.value)}
      />
      <div className="card">Second Option</div>
      <input
        placeholder="Second option"
        onChange={(e) => setOptionTwoText(e.target.value)}
      />
      <div className="card">
        <button className="btn" onClick={() => handleSubmit(router)}>
          Submit
        </button>
      </div>
      {isSubmitted ? (
        <div className="error-text card">{errorMessage}</div>
      ) : null}
    </div>
  );
};

const mapStateToProps = () => ({});

export default withRouter(connect(mapStateToProps)(NewQuestion));

export const forTestings = {
  getErrorMessage,
};
