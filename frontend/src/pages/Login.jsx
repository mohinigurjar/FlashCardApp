import { Mail, Lock } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";
import { validateLoginData } from "../utils/validation";

const Login = () => {

  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData({ ...data, [name]: value });
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      validateLoginData(data);
      const response = await loginUser(data);
      console.log("Login successful:", response.data);
      // Save the token to localStorage (or handle it as needed)
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
      
    } catch (error) {
      console.error("Login failed:", error);
      if (error.response && error.response.data) {
        if (error.response.data.error) {
          setError(error.response.data.error);
        } else {
          setError("Invalid input. Please check your details.");
        }
      } else if (error.message) {
        setError(error.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo + Heading */}
        <div className="text-center">
          <h1 className="mt-2 text-2xl font-bold text-gray-900">FlashLearn</h1>
          <p className="text-sm text-gray-600">Welcome back, sign in to continue</p>
        </div>

        {/* Card */}
        <div className="rounded-xl bg-white p-8 shadow-md">
          <h2 className="text-xl font-semibold text-gray-900 text-center">
            Sign in to your account
          </h2>
         <br></br>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
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
                  onChange={onChangeHandler}
                  required
                  value = {data.email}
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
                  placeholder="Enter your password"
                  onChange = {onChangeHandler}
                  required
                  value={data.password}
                  className="block w-full rounded-md border border-gray-300 pl-9 pr-3 py-2 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <a href="/forgot-password" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                Forgot password?
              </a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full rounded-md bg-gradient-to-r from-indigo-500 to-purple-500 py-2 px-4 text-sm font-semibold text-white shadow-sm hover:from-indigo-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
            >
              Sign in
            </button>

            {error && (
              <div className="mt-4 rounded-md bg-red-100 p-3 text-sm text-red-700">
                {error}
              </div>
            )}

          </form>

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
