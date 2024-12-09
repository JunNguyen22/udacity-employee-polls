import { connect } from "react-redux";

const Leaderboard = ({ leaderBoardUsers }) => {
  return (
    <div className="leaderBoard">
      <table>
        <thead>
          <tr>
            <th>Users</th>
            <th>Answered</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {leaderBoardUsers.map((user) => (
            <tr key={user.id}>
              <td>
                <div className="leaderBoard-name-plate">
                  <img className="avatar" src={user.avatarURL}></img>
                  <div>
                    <div>{user.name}</div>
                    <div>{user.id}</div>
                  </div>
                </div>
              </td>
              <td>{user.answersCount}</td>
              <td>{user.questionsCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = ({ users, questions }) => {
  console.log("tests: ", { users, questions });
  const leaderBoardUsers = Object.values(users).map((user) => {
    const questionsCount = user.questions.length;
    const answersCount = Object.keys(user.answers).length;
    return {
      ...user,
      questionsCount,
      answersCount,
      total: questionsCount + answersCount,
    };
  });

  console.log({ leaderBoardUsers });
  leaderBoardUsers.sort((a, b) => b.total - a.total);
  return {
    leaderBoardUsers,
  };
};

export default connect(mapStateToProps)(Leaderboard);
