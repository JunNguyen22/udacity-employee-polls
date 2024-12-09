import { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import LoadingBar from "react-redux-loading-bar";
import Nav from "./Nav";
import { Routes, Route, Navigate } from "react-router-dom";
import { ROUTES } from "../utils/routes_config";
import Questions from "./Questions";
import Question from "./Question";
import Leaderboard from "./Leaderboard";
import NewQuestion from "./NewQuestion";
import Login from "./Login";
import { withLoggedIn } from "../utils/guard";
import NotFound from "./NotFound";

const App = ({ dispatch, isAuthenticated, loadingBar }) => {
  const isLoading = loadingBar.default === 1;
  useEffect(() => {
    dispatch(handleInitialData());
  }, []);

  const QuestionsWithGuard = withLoggedIn(
    Questions,
    isAuthenticated,
    ROUTES.LOGIN
  );
  const QuestionWithGuard = withLoggedIn(
    Question,
    isAuthenticated,
    ROUTES.NOT_FOUND
  );
  const NewQuestionWithGuard = withLoggedIn(
    NewQuestion,
    isAuthenticated,
    ROUTES.LOGIN
  );
  const LeaderboardWithGuard = withLoggedIn(
    Leaderboard,
    isAuthenticated,
    ROUTES.LOGIN
  );

  return (
    <Fragment>
      <LoadingBar />
      <div className="container">
        {isLoading ? (
          <div className="loading-text card">Loading...</div>
        ) : (
          <Fragment>
            {isAuthenticated ? <Nav /> : null}
            <Routes>
              <Route
                caseSensitive
                path={ROUTES.LOGIN}
                element={<Login />}
              ></Route>
              <Route
                caseSensitive
                path={ROUTES.NOT_FOUND}
                element={<NotFound />}
              ></Route>
              <Route
                caseSensitive
                path={ROUTES.LEADER_BOARD}
                element={LeaderboardWithGuard()}
              />
              <Route
                caseSensitive
                path={ROUTES.QUESTIONS}
                element={QuestionsWithGuard()}
              />
              <Route
                caseSensitive
                path={ROUTES.QUESTION}
                element={QuestionWithGuard()}
              />
              <Route
                path={ROUTES.NEW_QUESTION}
                element={NewQuestionWithGuard()}
              />
              <Route
                path="/"
                element={<Navigate to={ROUTES.QUESTIONS} replace />}
              />
              <Route
                path="*"
                element={<Navigate to={ROUTES.NOT_FOUND} replace />}
              />
            </Routes>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

const mapStateToProps = ({ authedUser, loadingBar }) => ({
  isAuthenticated: authedUser !== null,
  loadingBar,
});

export default connect(mapStateToProps)(App);
