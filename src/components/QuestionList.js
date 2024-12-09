import { useNavigate } from "react-router-dom";
import { formatDate } from "../utils/helpers";
import { ROUTES } from "../utils/routes_config";
import { Fragment } from "react";

const QuestionItem = ({ question }) => {
  const navigate = useNavigate();

  const handleShow = (navigate, quesionId) => {
    navigate(`${ROUTES.QUESTIONS}/${quesionId}`);
  };

  const { timestamp, author, id } = question;
  const formattedDate = formatDate(timestamp);
  return (
    <div className="item">
      <div className="card">{author}</div>
      <div className="card">{formattedDate}</div>
      <div className="card">
        <button className="btn" onClick={() => handleShow(navigate, id)}>
          Show
        </button>
      </div>
    </div>
  );
};

const QuestionList = ({ title, questions }) => {
  return (
    <div className="question-list">
      <div className="header">{title}</div>
      <div className="body">
        {questions.length ? (
          <Fragment>
            {questions.map((question) => (
              <QuestionItem key={question.id} question={question} />
            ))}
          </Fragment>
        ) : (
          <div>No question left</div>
        )}
      </div>
    </div>
  );
};

export default QuestionList;
