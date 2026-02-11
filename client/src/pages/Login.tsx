import { useForm } from "react-hook-form";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";

interface LoginFormData {
  email: string;
  password: string;
}

const Login = () => {
  const { register, handleSubmit } = useForm<LoginFormData>();
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const res = await api.post("/auth/login", data);
      auth?.login(res.data.token, res.data.user);
      navigate("/");
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 to-slate-700">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-slate-800">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-slate-500 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-slate-500 outline-none"
          />

          <button
            type="submit"
            className="w-full bg-slate-900 text-white p-3 rounded-lg hover:bg-slate-800 transition duration-300 font-semibold"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm mt-4 text-slate-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-slate-900 font-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
