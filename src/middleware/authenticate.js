const authenticate = (store) => (next) => (action) => {
  let id;
  if (action.type === "SET_AUTHED_USER") {
    console.log("run authenticate: ", { ...action }, store.getState());
    const { users } = store.getState();
    const findUser = users[action?.id];
    console.log("finduser: ", findUser);
    if (findUser?.password === action?.password) {
      id = findUser?.id;
    }
  }

  //   console.group(action.type);
  //   console.log("Authenticate: ", action);
  //   const returnValue = next(action);
  //   console.log("The new state: ", store.getState());
  //   console.groupEnd();
  return next({ ...action, id });
};

export default authenticate;
