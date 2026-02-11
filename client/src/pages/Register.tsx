import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}

const Register = () => {
  const { register, handleSubmit } = useForm<RegisterFormData>();
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await api.post("/auth/register", data);
      alert("Account created! Please login.");
      navigate("/login");
    } catch (error) {
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 to-slate-700">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-slate-800">
          Create Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            {...register("name", { required: true })}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-slate-500 outline-none"
          />

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
            Register
          </button>
        </form>

        <p className="text-center text-sm mt-4 text-slate-600">
          Already have an account?{" "}
          <Link to="/login" className="text-slate-900 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
