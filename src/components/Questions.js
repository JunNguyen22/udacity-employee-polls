import { connect } from "react-redux";
import QuestionList from "./QuestionList";

const Questions = ({ answeredQuestions, unansweredQuestions }) => {
  return (
    <div>
      <QuestionList title="New Questions" questions={unansweredQuestions} />
      <QuestionList title="Done" questions={answeredQuestions} />
    </div>
  );
};

const getQuestionLists = (user, questions) => {
  const answeredQuestions = [];
  const unansweredQuestions = [];
  Object.entries(questions).forEach(([questionId, question]) => {
    const isAnswered = !!user.answers[questionId];
    if (isAnswered) {
      answeredQuestions.push(question);
    } else {
      unansweredQuestions.push(question);
    }
  });
  const sortQuestion = (a, b) => b.timestamp - a.timestamp;
  answeredQuestions.sort(sortQuestion);
  unansweredQuestions.sort(sortQuestion);
  return [answeredQuestions, unansweredQuestions];
};

const mapStateToProps = ({ questions, authedUser, users }) => {
  const loggedInUser = users[authedUser];
  const [answeredQuestions, unansweredQuestions] = getQuestionLists(
    loggedInUser,
    questions
  );
  return { answeredQuestions, unansweredQuestions };
};

export default connect(mapStateToProps)(Questions);
