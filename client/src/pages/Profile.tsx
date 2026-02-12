import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import MainLayout from "../layout/MainLayout";
import api from "../api/axios";

interface ProfileData {
  name: string;
  email: string;
  currency: string;
  monthlyBudget: number;
  password?: string;
}

const Profile = () => {
  const { register, handleSubmit, reset } = useForm<ProfileData>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await api.get("/users/profile");
      reset(res.data);
      setLoading(false);
    };

    fetchProfile();
  }, [reset]);

  const onSubmit = async (data: ProfileData) => {
    await api.put("/users/profile", data);
    alert("Profile updated successfully!");
  };

  if (loading) return <MainLayout>Loading...</MainLayout>;

  return (
    <MainLayout>
      <div className="bg-white p-8 rounded-2xl shadow-md max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold mb-6">Profile Settings</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            {...register("name")}
            placeholder="Name"
            className="w-full p-3 border rounded-lg"
          />

          <input
            {...register("email")}
            disabled
            className="w-full p-3 border rounded-lg bg-gray-100"
          />

          <select
            {...register("currency")}
            className="w-full p-3 border rounded-lg"
          >
            <option value="Rs">Rs (LKR)</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>

          <input
            type="number"
            {...register("monthlyBudget")}
            placeholder="Monthly Budget"
            className="w-full p-3 border rounded-lg"
          />

          <button
            type="submit"
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </MainLayout>
  );
};

export default Profile;
