import { useNavigate } from "react-router-dom";
import { formatDate } from "../utils/helpers";
import { ROUTES } from "../utils/routes_config";
import { Fragment, useEffect, useState } from "react";

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

const QuestionList = ({ titles, questions }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [activeList, setActiveList] = useState([]);

  useEffect(() => {
    setActiveList(questions[activeTab]);
  }, [activeTab]);

  const handleChangeTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="question-list">
      <div className="header">
        <ul>
          {titles.map((title, index) => (
            <li
              className={activeTab === index ? "selected-underline" : ""}
              onClick={() => handleChangeTab(index)}
              key={title}
            >
              {title}
            </li>
          ))}
        </ul>
      </div>
      <div className="body">
        {activeList.length ? (
          <Fragment>
            {activeList.map((question) => (
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
