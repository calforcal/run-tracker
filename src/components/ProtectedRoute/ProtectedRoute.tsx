import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredScope?: string;
}

interface CustomJWTPayload {
  sub: string;
  exp: number;
  iat: number;
  uuid: string;
  name: string;
  scopes: string;
  role?: string;
  userId?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredScope,
}) => {
  const location = useLocation();

  const checkAuth = (): [string, boolean] => {
    const authToken = Cookies.get("accessToken");

    if (!authToken) return ["", false];

    const decodedToken = jwtDecode<CustomJWTPayload>(authToken);

    if (requiredScope) {
      const scopes = decodedToken.scopes;

      if (scopes === requiredScope) {
        return [scopes, true];
      }
      if (scopes === "strava") {
        return [scopes, false];
      }
      return [scopes, false];
    }

    return ["strava spotify", false];
  };

  const authCheck = checkAuth();

  console.log("auth check", authCheck);

  if (authCheck[0] === "strava") {
    return <Navigate to="/spotify/login" state={{ from: location }} replace />;
  }

  if (!authCheck[1]) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
