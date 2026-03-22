import { useState } from "react";
import ApiService from "../api/ApiService";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      const response = await ApiService.loginUser({
        email,
        password
      });

      localStorage.setItem("token", response.token);

      alert("Login Successful");

      navigate("/dashboard");

    } catch (error) {

      console.error(error);
      alert("Login Failed");

    }
  };

  return (

    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 px-4">

      <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8">

        <h2 className="text-2xl font-bold text-center mb-2">
          श्रेष्ठ बंसवली गर्नुहोस।
        </h2>

        <p className="text-gray-500 text-center text-sm mb-6">
          Login to access your family tree system
        </p>

        <form onSubmit={handleLogin} className="space-y-4">

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
          />

          {/* Password with Eye */}
          <div className="relative">

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              required
            />

            <span
              className="absolute right-3 top-2 cursor-pointer text-gray-500"
              onClick={()=>setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁"}
            </span>

          </div>

          {/* Forgot Password */}
          <div className="text-right text-sm">

            <Link
              to="/forgot-password"
              className="text-blue-500 hover:underline"
            >
              Forgot Password?
            </Link>

          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>

        </form>

        {/* Register Link */}
        <p className="text-center text-sm mt-6">

          Don't have an account?{" "}

          <Link
            to="/register"
            className="text-blue-600 font-semibold hover:underline"
          >
            Register
          </Link>

        </p>

      </div>

    </div>

  );
}