import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserProfile, editUserProfile } from "../services/api";
import { validateEditProfileData } from "../utils/validation";

const EditProfile = () => {
    const [userData, setUserData] = useState({
        name: "",
        email: ""
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        // Fetch user profile data to pre-fill the form
        const fetchUserProfile = async () => {
            try {
                const res = await getUserProfile();
                setUserData({
                    name: res.data.name,
                    email: res.data.email
                });
            }catch (err) {
                console.error("Error fetching profile:", err);
                setError("Failed to load profile data.");
            }
        };

        fetchUserProfile();
    }, []);

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess(""); 
        try {
            if(!validateEditProfileData(userData)){
                
                console.error("Invalid input data:", userData);
                setError("Invalid input data.");
                // return;
            }
            const response = await editUserProfile(userData);
            console.log("Profile updated successfully:", response.data);
            setSuccess("Profile updated successfully!");
            setTimeout(() => navigate("/profile"), 1000); // Redirect after a short delay
        } catch (error) {
            console.error("Request failed:", error.config.url);
            console.error("Error updating profile:", error);
            if (error.response && error.response.data && error.response.data.error) {
                setError(error.response.data.error);
            } else {
                setError("Something went wrong. Please try again later.");
            }
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4 text-center">Edit Profile</h2>
            {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
            {success && <p className="text-green-500 mb-4 text-center">{success}</p>}
            <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div>
                    <label className="block mb-1 font-medium">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={userData.name}
                        onChange={onChangeHandler}
                        className="w-full border border-gray-300 p-2 rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 font-medium">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={onChangeHandler}
                        className="w-full border border-gray-300 p-2 rounded"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
                >
                    Update Profile
                </button>
            </form>
        </div>
    );
}


export default EditProfile;