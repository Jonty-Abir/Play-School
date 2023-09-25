import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../../redux/store";

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthorized, token } = useSelector(
    (state: RootState) => state.authReducer
  );

  return <>{isAuthorized && token ? children : <Navigate to={"/login"} />}</>;
}

export default PrivateRoute;
