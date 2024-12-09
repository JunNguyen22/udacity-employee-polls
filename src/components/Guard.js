import { useEffect } from "react";
import { connect } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { setRoute } from "../actions/route";
import { ROUTES } from "../utils/routes_config";

const withRouter = (Component) => {
  const ComponentWithRouterProp = (props) => {
    const location = useLocation();
    return <Component {...props} lastestLocation={location?.pathname} />;
  };

  return ComponentWithRouterProp;
};

const Guard = ({
  children,
  isAuthenticated,
  redirectTo,
  dispatch,
  lastestLocation,
}) => {
  useEffect(() => {
    const route = isAuthenticated ? "" : lastestLocation;
    dispatch(setRoute({ route }));
  }, []);

  return isAuthenticated ? (
    (() => children)()
  ) : (
    <Navigate to={ROUTES.LOGIN} replace />
  );
};

const mapStateToProps = ({ authedUser }) => {
  return {
    isAuthenticated: authedUser !== null,
  };
};

export default withRouter(connect(mapStateToProps)(Guard));
