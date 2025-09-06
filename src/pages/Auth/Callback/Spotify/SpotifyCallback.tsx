import { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { authorizeSpotifyUser } from "../../../../apis/auth";

export default function SpotifyCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const code = searchParams.get("code");

  const handleUserAuth = useCallback(
    async (code: string) => {
      setLoading(true);
      // Add functionality to stop from sending twice
      const successfullyAuthorized = await authorizeSpotifyUser(code);
      if (successfullyAuthorized) {
        setLoading(false);
        navigate("/athlete");
      }

      setLoading(false);
      setIsError(true);
    },
    [navigate]
  );

  useEffect(() => {
    if (!code) {
      return;
    }

    void handleUserAuth(code);
  }, [code, handleUserAuth]);

  if (isError) {
    return <div>God damn error</div>;
  }
  if (loading) {
    return <div>loading....</div>;
  }
  return <div>Token received see ya later</div>;
}
