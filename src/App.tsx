import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Callback from "./pages/Auth/Callback/Callback";
import Athlete from "./pages/Athlete/Athlete";
import ActivityByID from "./pages/Activity/ActivityByID/ActivityByID";
import SpotifyLogin from "./pages/SpotifyLogin/SpotifyLogin";
import SpotifyCallback from "./pages/Auth/Callback/Spotify/SpotifyCallback";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/spotify/login" element={<SpotifyLogin />} />
        <Route path="/auth/callback" element={<Callback />} />
        <Route path="/auth/callback/spotify" element={<SpotifyCallback />} />
        <Route path="/athlete" element={<Athlete />} />
        <Route path="/activity/:activityID" element={<ActivityByID />} />
      </Routes>
    </>
  );
}

export default App;
