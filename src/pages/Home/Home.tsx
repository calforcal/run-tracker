import { Link } from "react-router-dom";

const url =
  "http://www.strava.com/oauth/authorize?client_id=161522&response_type=code&redirect_uri=http://127.0.0.1:5173/auth/callback&approval_prompt=auto&scope=read,activity:read_all";

export default function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <Link to={url}>Login</Link>
    </div>
  );
}
