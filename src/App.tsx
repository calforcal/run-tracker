import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Callback from "./pages/Auth/Callback/Callback";
import Athlete from "./pages/Athlete/Athlete";
import ActivityByID from "./pages/Activity/ActivityByID/ActivityByID";
import SpotifyLogin from "./pages/SpotifyLogin/SpotifyLogin";
import SpotifyCallback from "./pages/Auth/Callback/Spotify/SpotifyCallback";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/spotify/login" element={<SpotifyLogin />} />
        <Route path="/auth/callback" element={<Callback />} />
        <Route path="/auth/callback/spotify" element={<SpotifyCallback />} />
        <Route
          path="/athlete"
          element={
            <ProtectedRoute requiredScope="strava spotify">
              <Athlete />
            </ProtectedRoute>
          }
        />
        <Route
          path="/activity/:activityID"
          element={
            <ProtectedRoute requiredScope="strava spotify">
              <ActivityByID />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
