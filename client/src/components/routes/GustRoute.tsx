import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../../redux/store";

function GustRoute({ children }: { children: React.ReactNode }) {
  const { isAuthorized, token } = useSelector(
    (state: RootState) => state.authReducer
  );

  return <>{isAuthorized && token ? <Navigate to={"/"} /> : children}</>;
}

export default GustRoute;
