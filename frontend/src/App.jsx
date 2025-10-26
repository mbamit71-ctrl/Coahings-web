import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Components
// ensure these match the actual filenames in /src/components (case-sensitive)
import TopPage from "./components/toppage";
import Footer from "./components/footer";

// Pages
import HomePage from "./pages/HomePage.jsx";
import ResultsPage from "./pages/ResultsPage.jsx";
import CoursesPage from "./pages/CoursesPage.jsx";
import AdminLogin from "./pages/adminLogin.jsx";
import AdminDashboard from "./pages/adminDashboard.jsx";

const App = () => {
  // added: auth state lifted to App
  const [isAuth, setIsAuth] = useState(false);

  return (
    <BrowserRouter>
      {/* Navbar fixed on top */}
      <TopPage />

      {/* Page Routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/courses" element={<CoursesPage />} />

        {/* pass setter to login so it can mark user as authenticated */}
        <Route path="/admin" element={<AdminLogin setIsAuth={setIsAuth} />} />

        {/* protected dashboard route */}
        <Route
          path="/admin/dashboard"
          element={isAuth ? <AdminDashboard /> : <Navigate to="/admin" replace />}
        />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
};

export default App;
