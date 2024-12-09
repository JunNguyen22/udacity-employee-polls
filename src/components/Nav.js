import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { setAuthedUser } from "../actions/authedUser";
import { ROUTES } from "../utils/routes_config";

const Nav = ({ dispatch, authedUser, avatar }) => {
  const location = useLocation();
  console.log("test location: ", {
    location,
  });

  console.log({ authedUser });
  const getSelected = (route) => {
    return location.pathname.includes(route) ? "nav-selected" : "";
  };

  return (
    <nav className="nav">
      <ul className="nav-routes">
        <li className={getSelected(ROUTES.QUESTIONS)}>
          <Link to={ROUTES.QUESTIONS}>Questions</Link>
        </li>
        <li className={getSelected(ROUTES.LEADER_BOARD)}>
          <Link to={ROUTES.LEADER_BOARD}>Leaderboard</Link>
        </li>
        <li className={getSelected(ROUTES.NEW_QUESTION)}>
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

const mapStateToProps = ({ authedUser, users, tweets }) => {
  const avatar = users[authedUser].avatarURL;
  return { authedUser, avatar };
};

export default connect(mapStateToProps)(Nav);
