import { connect } from "react-redux";

const Questions = ({ questions }) => {
  console.log("questions", { questions });
  return <div>Questions Page</div>;
};

const mapStateToProps = ({ questions }) => ({ questions });

export default connect(mapStateToProps)(Questions);
