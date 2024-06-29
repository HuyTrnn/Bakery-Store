import React from "react";
import { Route, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const RouterGuard = ({ component: Component, ...rest }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated && user?.account_level === "1" ? (
          <Component {...props} />
        ) : (
          navigate("/login")
        )
      }
    />
  );
};

export default RouterGuard;