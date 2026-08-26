import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Confirmation from "./components/Confirmation";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/confirmation/:id" element={<Confirmation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;