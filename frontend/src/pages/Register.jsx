import { User, Mail, Lock } from "lucide-react";
import { useState, usestate } from 'react';
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";
import { validateSignUpData } from "../utils/validation";

const Register = () => {
  const navigate = useNavigate();

  const[data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })
  const [error, setError] = useState("");

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData({ ...data, [name]: value });
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      validateSignUpData(data);
      const response = await registerUser(data);
      
      navigate("/login");

    } catch (error) {
      console.error("Registration failed:", error);
       if (error.response && error.response.data) {
        if (error.response.data.error) {
          setError(error.response.data.error);
        } else {
          setError("Invalid input. Please check your details.");
        }
      } else if (error.message) {
        // ⚠️ This handles frontend validator errors
        setError(error.message);
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
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="mt-1 relative">
                <User className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Choose a username"
                  onChange={onChangeHandler}
                  value={data.name}
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
                  onChange={onChangeHandler}
                  value={data.email}
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
                  onChange={onChangeHandler}
                  value={data.password}
                  required
                  className="block w-full rounded-md border border-gray-300 pl-9 pr-3 py-2 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="mt-1 relative">
                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  onChange={onChangeHandler}
                  value={data.confirmPassword}
                  required
                  className="block w-full rounded-md border border-gray-300 pl-9 pr-3 py-2 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div> 

            {/* Submit */}
            <button
              type="submit"
              className="w-full rounded-md bg-gradient-to-r from-indigo-500 to-purple-500 py-2 px-4 text-sm font-semibold text-white shadow-sm hover:from-indigo-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
            >
              Create account
            </button>

            {error && (
              <div className="mt-4 rounded-md bg-red-100 p-3 text-sm text-red-700">
                {error}
              </div>
      )}
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
