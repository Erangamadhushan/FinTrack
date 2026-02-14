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
    <>
      <div className="min-h-screen flex bg-gray-100">
        <div className="hidden lg:flex w-1/2 bg-white items-center justify-center p-10">
          <div className="max-w-md space-y-6">
            <h1 className="text-2xl font-semibold text-gray-800">FINTRACK</h1>

            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
                <p className="text-sm text-gray-500">CURRENT BALANCE</p>
                <p className="text-xl font-bold text-blue-600">Rs.250,000.00</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
                <p className="text-center font-medium text-gray-700">
                  Smart Expense Tracking
                </p>
              </div>

              <div className="border-2 border-dashed border-gray-200 p-6 rounded-xl text-center">
                <button className="w-12 h-12 rounded-full bg-blue-500 text-white text-xl">
                  +
                </button>
                <p className="mt-3 text-sm text-gray-500">
                  Create budgets easily
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Join Fintrack Today!
              </h2>
              <p className="text-gray-500 text-sm">
                Track, analyze, and improve your financial habits.
              </p>
            </div>
          </div>
        </div>

        <div className="flex w-full lg:w-1/2 items-center justify-center bg-gray-50">
          <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Create Account
            </h2>
            <p className="text-gray-500 mb-6 text-sm">
              Start managing your finance smarter and faster
            </p>

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
      </div>
    </>
  );
};

export default Register;
