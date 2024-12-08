export const SET_AUTHED_USER = "SET_AUTHED_USER";

export function setAuthedUser(payload) {
  return {
    type: SET_AUTHED_USER,
    id: payload?.id,
    password: payload?.password,
  };
}
