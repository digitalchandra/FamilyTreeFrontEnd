import { useState } from "react";
import { Link } from "react-router-dom";
import ApiService from "../api/ApiService";

export default function ForgotPassword() {

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const res = await ApiService.forgetPassword({ email });

      setMessage(res.message || "Reset link sent to your email");
      setError("");
      setEmail("");

    } catch (err) {

      setError(
        err?.response?.data?.message || "Something went wrong"
      );
      setMessage("");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">

      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">

        <h2 className="text-2xl font-bold text-center mb-6">
          Forgot Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border rounded-lg p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {message && <p className="text-green-600">{message}</p>}
          {error && <p className="text-red-600">{error}</p>}

          <button
            className="w-full bg-blue-600 text-white py-2 rounded-lg"
          >
            Send Reset Link
          </button>

        </form>

        <div className="text-center mt-4">

          <Link to="/login" className="text-blue-600">
            Back to Login
          </Link>

        </div>

      </div>
    </div>
  );
}