import { User, Mail, Lock } from "lucide-react";
import { useState, usestate } from 'react';
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await registerUser({ name, email, password });
      
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
      if (error.response) {
    console.log("📥 Error response from backend:", error.response.data); // <--- ADD THIS

    if (error.response.data.error) {
      setError(error.response.data.error);
    } else {
      setError("Invalid input. Please check your details.");
    }
  } else {
    setError("Something went wrong. Please try again later.");
  }
    }
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md space-y-8 mb-20">
        <div className="text-center">
          <h1 className="mt-2 text-2xl font-bold text-gray-900">FlashLearn</h1>
          <p className="text-sm text-gray-600">Start your learning journey today</p>
        </div>

        {/* Card */}
        <div className="rounded-xl bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 text-center">
            Create your account
          </h2>
         <br></br>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="mt-1 relative">
                <User className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Choose a username"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required
                  className="block w-full rounded-md border border-gray-300 pl-9 pr-3 py-2 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1 relative">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                  className="block w-full rounded-md border border-gray-300 pl-9 pr-3 py-2 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Create a password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                  className="block w-full rounded-md border border-gray-300 pl-9 pr-3 py-2 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Confirm Password
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="mt-1 relative">
                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="password"
                  id="confirm-password"
                  name="confirm-password"
                  placeholder="Confirm your password"
                  required
                  className="block w-full rounded-md border border-gray-300 pl-9 pr-3 py-2 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div> */}

            {/* Submit */}
            <button
              type="submit"
              className="w-full rounded-md bg-gradient-to-r from-indigo-500 to-purple-500 py-2 px-4 text-sm font-semibold text-white shadow-sm hover:from-indigo-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
            >
              Create account
            </button>
          </form>

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
