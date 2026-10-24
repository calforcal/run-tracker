import { useRef, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { authorizeStravaUser, login } from "../../../apis/auth";
import { LoadingSpinner } from "../../../components/LoadingSpinner";
import { ErrorMessage } from "../../../components/ErrorMessage";

export default function Callback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const exchangedRef = useRef(false);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const code = searchParams.get("code");
  const state = searchParams.get("state") || "register";

  useEffect(() => {
    // Guard against double execution
    if (!code || exchangedRef.current) {
      return;
    }

    exchangedRef.current = true;

    const handleUserAuth = async () => {
      setLoading(true);

      try {
        let token = "";
        if (state === "login") {
          token = await login(code);
        } else if (state === "register") {
          token = await authorizeStravaUser(code);
        }

        if (token) {
          navigate("/athlete");
        } else {
          setIsError(true);
        }
      } catch (error) {
        console.error("Auth error:", error);
        setIsError(true);
      } finally {
        setLoading(false);
      }
    };

    void handleUserAuth();
  }, [code, state, navigate]);

  if (isError) {
    return <ErrorMessage />;
  }
  if (loading) {
    return <LoadingSpinner />;
  }
  return <div>Token received see ya later</div>;
}
