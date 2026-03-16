import { useState } from "react";
import ApiService from "../api/ApiService";

export default function Register() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "SUPER_ADMIN"
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {

      const response = await ApiService.registerUser(formData);

      console.log(response);

      alert("User Registered Successfully");

    } catch (error) {

      console.error(error);
      alert("Registration Failed");

    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">

      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">

        <h2 className="text-2xl font-bold text-center mb-6">
          Register
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full border px-3 py-2 rounded"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border px-3 py-2 rounded"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border px-3 py-2 rounded"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <select
            name="role"
            className="w-full border px-3 py-2 rounded"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="SUPER_ADMIN">SUPER ADMIN</option>
            <option value="ADMIN">ADMIN</option>
            <option value="USER">USER</option>
          </select>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
          >
            Register
          </button>

        </form>

      </div>

    </div>
  );
}