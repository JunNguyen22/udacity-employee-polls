import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { setAuthedUser } from "../actions/authedUser";
import { ROUTES } from "../utils/routes_config";

const withRouter = (Component) => {
  const ComponentWithRouterProp = (props) => {
    let location = useLocation();
    return <Component {...props} router={{ location }} />;
  };

  return ComponentWithRouterProp;
};

const Nav = ({ dispatch, authedUser, avatar, router }) => {
  const getSelected = (router, route) => {
    return router.location.pathname.includes(route) ? "selected-underline" : "";
  };

  return (
    <nav className="nav">
      <ul className="nav-routes">
        <li className={getSelected(router, ROUTES.QUESTIONS)}>
          <Link to={ROUTES.QUESTIONS}>Questions</Link>
        </li>
        <li className={getSelected(router, ROUTES.LEADER_BOARD)}>
          <Link to={ROUTES.LEADER_BOARD}>Leaderboard</Link>
        </li>
        <li className={getSelected(router, ROUTES.NEW_QUESTION)}>
          <Link to={ROUTES.NEW_QUESTION}>New</Link>
        </li>
      </ul>

      <ul>
        <li className="nav-user">
          <img
            className="avatar"
            src={avatar}
            alt={`avatar of ${authedUser}`}
          />
          {authedUser}
        </li>
        <li>
          <div
            className="nav-btn"
            onClick={() => {
              dispatch(setAuthedUser());
            }}
          >
            Logout
          </div>
        </li>
      </ul>
    </nav>
  );
};

const mapStateToProps = ({ authedUser, users }) => {
  const avatar = users[authedUser].avatarURL;
  return { authedUser, avatar };
};

export default withRouter(connect(mapStateToProps)(Nav));
