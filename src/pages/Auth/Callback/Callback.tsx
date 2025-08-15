import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Cookies from "js-cookie";

type CallbackResponse = {
  access_token: string;
};

export default function Callback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const code = searchParams.get("code");

  useEffect(() => {
    if (!code) {
      return;
    }

    const body = {
      code: code,
    };

    const authorizeUser = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "http://localhost:8000/api/authorize-user",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          }
        );

        const tokenResponse: CallbackResponse = await response.json();
        if (tokenResponse.access_token) {
          Cookies.set("accessToken", tokenResponse.access_token);
        }

        setToken(tokenResponse.access_token);
        setLoading(false);
        return;
      } catch (err) {
        console.error(err);
        setLoading(false);
        setIsError(true);
      }
    };

    authorizeUser();
  }, [code]);

  if (isError) {
    return <div>God damn error</div>;
  }
  if (loading) {
    return <div>loading....</div>;
  }

  if (token) {
    navigate("/athlete");
  }
  return <div>This is the token you wanted: {token}</div>;
}
