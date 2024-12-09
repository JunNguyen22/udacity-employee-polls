export const SET_ROUTE = "SET_ROUTE";

export function setRoute(payload) {
  return {
    type: SET_ROUTE,
    route: payload?.route,
  };
}
