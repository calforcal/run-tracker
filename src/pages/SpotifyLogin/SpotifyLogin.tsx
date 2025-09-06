import { Link } from "react-router-dom";

export default function SpotifyLogin() {
  const url =
    "https://accounts.spotify.com/authorize?response_type=code&client_id=20669477d15d4884a5f400516c7114d4&scope=user-read-private user-read-email user-read-recently-played&redirect_uri=http://127.0.0.1:5173/auth/callback/spotify";

  return <Link to={url}>Authorize Spotify</Link>;
}
