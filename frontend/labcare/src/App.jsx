import AppProvider from "./context/AppProvider.jsx";
import Home from "./sections/Home.jsx";
import { Routes, Route } from "react-router-dom";
import AuthCard from "./components/AuthCard.jsx";
<<<<<<< HEAD
import Dashboard from "./sections/Dashboard.jsx";
=======
>>>>>>> af655c1682f91aba3012fbd034a0609064f9a01d

function App() {
  return (
    <AppProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AuthCard />} />
<<<<<<< HEAD
        <Route path="/dashboard" element={<Dashboard />} />
=======
>>>>>>> af655c1682f91aba3012fbd034a0609064f9a01d
      </Routes>
    </AppProvider>
  );
}

export default App;
