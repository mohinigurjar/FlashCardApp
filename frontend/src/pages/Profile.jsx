// src/pages/Profile.jsx
import React, { useEffect, useState } from 'react';
import { getUserProfile } from '../services/api'; 
import { useNavigate } from 'react-router-dom';


const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getUserProfile();
        setUser(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load profile");
      }
    };

    fetchProfile();
  }, []);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!user) return <p>Loading...</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Your Profile</h2>
      <div className="space-y-3">
        <p><strong>Name:</strong> {user.name || 'N/A'}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
      </div>
      <div className="flex justify-between mt-6">
  <button
    onClick={() => navigate("/profile/edit")}
    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
  >
    Edit Profile
  </button>

  <button
    onClick={() => navigate("/profile/password")}
    className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
  >
    Reset Password
  </button>
</div>
    </div>
  );
};

export default Profile;
