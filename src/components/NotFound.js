import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Fragment>
      <div className="card">Not Found</div>;
      <div className="card">
        What you're looking for is not here, we're sorry
      </div>
      <div className="card">
        <button onClick={() => navigate("/")} className="btn">
          Go back
        </button>
      </div>
      ;
    </Fragment>
  );
};

export default NotFound;
