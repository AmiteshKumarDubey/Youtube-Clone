import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaGoogle, FaEnvelope, FaLock } from "react-icons/fa";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [displayName, setDisplayName] = useState("");
  const { login, signup, googleLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(email, password, displayName);
      }
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-white mb-2 text-center">
          {isLogin ? "Sign In" : "Create Account"}
        </h1>
        <p className="text-gray-400 text-center mb-8">
          {isLogin ? "New to YouTube Clone?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-400 hover:text-blue-300"
          >
            {isLogin ? "Sign up now" : "Sign in"}
          </button>
        </p>

        {error && (
          <div className="bg-red-900/30 border border-red-700 text-red-400 p-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <button
          onClick={handleGoogleLogin}
          className="w-full bg-white hover:bg-gray-100 text-black font-semibold py-3 px-4 rounded-lg flex items-center justify-center mb-6"
        >
          <FaGoogle className="mr-3" />
          Continue with Google
        </button>

        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-gray-700"></div>
          <span className="px-4 text-gray-400">or</span>
          <div className="flex-1 border-t border-gray-700"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-gray-400 mb-2">Display Name</label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500"
                  placeholder="Enter your name"
                  required={!isLogin}
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-gray-400 mb-2">Email</label>
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-400 mb-2">Password</label>
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500"
                placeholder="Enter your password"
                required
                minLength={6}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg mt-6"
          >
            {isLogin ? "Sign In" : "Create Account"}
          </button>
        </form>

        <p className="text-gray-400 text-sm text-center mt-8">
          By continuing, you agree to our{" "}
          <Link to="/terms" className="text-blue-400 hover:text-blue-300">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link to="/privacy" className="text-blue-400 hover:text-blue-300">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}