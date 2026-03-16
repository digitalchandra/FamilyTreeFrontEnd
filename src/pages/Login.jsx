import { useState } from "react";
import ApiService from "../api/ApiService";
import { useNavigate, Link } from "react-router-dom";
export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response = await ApiService.loginUser({
        email,
        password
      });

      console.log(response);

      alert("Login Successful");

      localStorage.setItem("token", response.token);
      navigate("/dashboard");
    } catch (error) {

      console.error(error);
      alert("Login Failed");

    }

  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">

      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">

        <h2 className="text-2xl font-bold text-center mb-6">
          Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            className="w-full border px-3 py-2 rounded"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border px-3 py-2 rounded"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Login
          </button>

        </form>

      </div>

    </div>
  );
}