import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import Family from "./pages/Family";
import AddFamilyMembers from "./pages/AddFamilyMembers";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/reset-password" element={<ResetPassword />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/family" element={
            <ProtectedRoute>
                <Family/>
            </ProtectedRoute>
        }/>
         <Route path="/addfamilymembers" element={
            <ProtectedRoute>
                <AddFamilyMembers/>
            </ProtectedRoute>
        }/>


      </Routes>

    </BrowserRouter>
  );
}

export default App;