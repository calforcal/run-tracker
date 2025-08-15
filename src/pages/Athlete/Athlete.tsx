import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import type { Athlete } from "../../types/athlete";

export default function Athlete() {
  const accessToken = Cookies.get("accessToken");
  const [athlete, setAthlete] = useState<Athlete | null>();
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getAthlete = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8000/api/athlete", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const data: Athlete = await response.json();
        setAthlete(data);
        setLoading(false);
      } catch (err) {
        setIsError(true);
        setLoading(false);
        console.error(err);
      }
    };

    getAthlete();
  }, [accessToken]);

  if (isError) {
    return <div>God damn error</div>;
  }
  if (loading) {
    return <div>loading....</div>;
  }
  if (athlete) {
    return (
      <>
        <div>This is the username: {athlete.username}</div>
      </>
    );
  }
}
