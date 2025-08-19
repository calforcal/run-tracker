import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Callback from "./pages/Auth/Callback/Callback";
import Athlete from "./pages/Athlete/Athlete";
import ActivityByID from "./pages/Activity/ActivityByID/ActivityByID";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/callback" element={<Callback />} />
        <Route path="/athlete" element={<Athlete />} />
        <Route path="/activity/:activityID" element={<ActivityByID />} />
      </Routes>
    </>
  );
}

export default App;
