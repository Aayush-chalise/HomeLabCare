import AppProvider from "./context/AppProvider.jsx";
import Home from "./sections/Home.jsx";
import { Routes, Route } from "react-router-dom";
import AuthCard from "./components/AuthCard.jsx";

function App() {
  return (
    <AppProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AuthCard />} />
      </Routes>
    </AppProvider>
  );
}

export default App;
