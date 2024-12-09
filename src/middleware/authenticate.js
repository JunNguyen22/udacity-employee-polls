const authenticate = (store) => (next) => (action) => {
  let id;
  if (action.type === "SET_AUTHED_USER") {
    const { users } = store.getState();
    const findUser = users[action?.id];
    if (findUser?.password === action?.password) {
      id = findUser?.id;
    }
  }
  return next({ ...action, id });
};

export default authenticate;
