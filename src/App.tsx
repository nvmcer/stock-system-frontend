import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import AddStockPage from "./pages/AddStockPage";
import EditStockPage from "./pages/EditStockPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/add" element={<AddStockPage />} />
        <Route path="/admin/edit/:id" element={<EditStockPage />} />
      </Routes>
    </Router>
  );
}

export default App;