import { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import Dashboard from "./Dashboard";
import LoadingBar from "react-redux-loading-bar";
import NewTweet from "./NewTweet";
import TweetPage from "./TweetPage";
import Nav from "./Nav";
import { Routes, Route, Navigate } from "react-router-dom";
import { ROUTES } from "../utils/routes_config";
import Questions from "./Questions";
import Question from "./Question";
import Leaderboard from "./Leaderboard";
import NewQuestion from "./NewQuestion";
import Login from "./Login";

const App = (props) => {
  useEffect(() => {
    props.dispatch(handleInitialData());
  }, []);

  return (
    <Fragment>
      <LoadingBar />
      <div className="container">
        {props.isNotAuthenticated === true ? (
          <Routes>
            <Route path={ROUTES.LOGIN} element={<Login />}></Route>
            <Route
              path="/"
              exact
              element={<Navigate to={ROUTES.LOGIN} replace={true} />}
            />
            <Route path="*" element={<Navigate to={"/"} replace={true} />} />
          </Routes>
        ) : (
          <Fragment>
            <Nav />
            <Routes>
              <Route path={ROUTES.QUESTIONS} element={<Questions />} />
              <Route
                path="/"
                exact
                element={<Navigate to={ROUTES.QUESTIONS} replace={true} />}
              />
              <Route path={ROUTES.QUESTION} element={<Question />} />
              <Route path={ROUTES.NEW_QUESTION} element={<NewQuestion />} />
              <Route path={ROUTES.LEADER_BOARD} element={<Leaderboard />} />
              <Route path="*" element={<Navigate to={"/"} replace={true} />} />
            </Routes>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

const mapStateToProps = ({ authedUser }) => ({
  isNotAuthenticated: authedUser === null,
});

export default connect(mapStateToProps)(App);
