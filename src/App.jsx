import { BrowserRouter, Routes, Route } from "react-router-dom";
import { EmployeeProvider } from "./context/EmployeeContext";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Profile from "./pages/Profile";
import Layout from "./components/Layout";

export default function App() {
  return (
    <EmployeeProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/profile/:id" element={<Profile />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </EmployeeProvider>
  );
}
