import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Callback from "./pages/Auth/Callback/Callback";
import Athlete from "./pages/Athlete/Athlete";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/callback" element={<Callback />} />
        <Route path="/athlete" element={<Athlete />} />
      </Routes>
    </>
  );
}

export default App;
