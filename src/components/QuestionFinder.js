import { Navigate, useParams } from "react-router-dom";
import { ROUTES } from "../utils/routes_config";
import { connect } from "react-redux";

const withRouter = (Component) => {
  const ComponentWithRouterProp = (props) => {
    const params = useParams();
    return <Component {...props} question_id={params.question_id} />;
  };

  return ComponentWithRouterProp;
};

const QuestionFinder = ({ children, questionExist }) => {
  return questionExist ? (
    (() => children)()
  ) : (
    <Navigate to={ROUTES.NOT_FOUND} replace />
  );
};

const mapStateToProps = ({ questions }, { question_id }) => {
  const questionExist = !!questions[question_id];
  return {
    questionExist,
  };
};

export default withRouter(connect(mapStateToProps)(QuestionFinder));
