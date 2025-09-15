import { Mail, Lock } from "lucide-react";

const Login = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo + Heading */}
        <div className="text-center">
          {/* <img
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
            alt="FlashLearn"
            className="mx-auto h-12 w-12"
          /> */}
          <h1 className="mt-2 text-2xl font-bold text-gray-900">FlashLearn</h1>
          <p className="text-sm text-gray-600">Welcome back, sign in to continue</p>
        </div>

        {/* Card */}
        <div className="rounded-xl bg-white p-8 shadow-md">
          <h2 className="text-xl font-semibold text-gray-900 text-center">
            Sign in to your account
          </h2>
         <br></br>

          <form className="space-y-4">
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
                  placeholder="Enter your password"
                  required
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
          </form>

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
              Create one
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
