import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { handleQuestionAnswer } from "../actions/questions";
import { Fragment } from "react";

const withRouter = (Component) => {
  const ComponentWithRouterProp = (props) => {
    const params = useParams();
    const navigate = useNavigate();
    return <Component {...props} router={{ params, navigate }} />;
  };

  return ComponentWithRouterProp;
};

const VoteInfo = ({ numberOfVotes, percentageOfVoters }) => {
  return (
    <Fragment>
      <div className="card">Number of votes: {numberOfVotes}</div>
      <div className="card">Percentage of voters: {percentageOfVoters}%</div>
    </Fragment>
  );
};

const QuestionOption = ({
  dispatch,
  question,
  answer,
  isTheAnswer,
  option,
}) => {
  const handleVote = () => {
    dispatch(handleQuestionAnswer(question.id, option));
  };

  return (
    <div className="item">
      <div
        className={`card ${isTheAnswer ? "answer-text" : "not-answer-text"}`}
      >
        {question[option].text}
      </div>
      {answer ? null : (
        <div className="card">
          <button className="btn" onClick={handleVote}>
            Click
          </button>
        </div>
      )}
    </div>
  );
};

const QuestionOptions = ({ dispatch, question, answer }) => {
  const titleText = answer ? "Your answer" : "Would you rather";
  return (
    <div>
      <div className="card title-card-no-background">{titleText}</div>
      <div className="card question-options">
        <QuestionOption
          dispatch={dispatch}
          question={question}
          answer={answer}
          option="optionOne"
          isTheAnswer={answer === "optionOne"}
        />
        <QuestionOption
          dispatch={dispatch}
          question={question}
          answer={answer}
          option="optionTwo"
          isTheAnswer={answer === "optionTwo"}
        />
      </div>
    </div>
  );
};

const Question = ({
  dispatch,
  question,
  answer,
  avatar,
  numberOfVotes,
  percentageOfVoters,
  router,
}) => {
  return (
    <div>
      <div className="card title-card-no-background">{`Poll by ${question.author}`}</div>
      <div className="card">
        <img className="big-avatar" src={avatar} />
      </div>
      <QuestionOptions
        dispatch={dispatch}
        question={question}
        answer={answer}
        numberOfVotes={numberOfVotes}
      />
      {answer ? (
        <VoteInfo
          numberOfVotes={numberOfVotes}
          percentageOfVoters={percentageOfVoters}
        />
      ) : null}
      <div className="card">
        <button className="btn" onClick={() => router.navigate("/")}>
          Back to Questions
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = ({ questions, authedUser, users }, { router }) => {
  const question_id = router.params.question_id;
  const question = questions[question_id];
  const author = users[question.author];
  const loggedInUser = users[authedUser];

  const answer = loggedInUser.answers[question_id];
  const avatar = author.avatarURL;
  const numberOfVotes = question[answer]?.votes?.length;
  const percentageOfVoters = (numberOfVotes / Object.keys(users).length) * 100;

  return {
    question,
    answer,
    avatar,
    numberOfVotes,
    percentageOfVoters,
    router,
  };
};

export default withRouter(connect(mapStateToProps)(Question));
