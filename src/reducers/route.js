import { SET_ROUTE } from "../actions/route";

export default function route(state = null, action) {
  switch (action.type) {
    case SET_ROUTE:
      return action?.route ?? state;
    default:
      return state;
  }
}
