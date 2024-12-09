import { Navigate } from "react-router-dom";

export function withCondition(Component, condition, redirectTo) {
  return function InnerComponent(props) {
    return condition ? (
      <Component {...props} />
    ) : (
      <Navigate to={redirectTo} replace />
    );
  };
}

export const withLoggedIn = (Component, isLoggedIn, redirectTo) =>
  withCondition(Component, isLoggedIn, redirectTo);
