import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { resetPassword } from '../services/api';
import { validateSignUpData } from '../utils/validation';

const ResetPassword = () => {
    const [form, setForm] = useState({
        oldPassword: "",
        newpassword: "",
        confirmPassword: ""
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        try {
            validateSignUpData(form);
            const response = await resetPassword(form);
            setSuccess("Password reset successfully! Redirecting to login...");
            setTimeout(() => navigate("/profile"), 1000); 
        } catch (error) {
            console.error("Error resetting password:", error);
            if (error.response && error.response.data && error.response.data.error) {
                setError(error.response.data.error);
            } else if (error.message) {
                setError(error.message);
            } else {
                setError("Something went wrong. Please try again later.");
            }     
        }
    };
    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>
            {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
            {success && <p className="text-green-500 mb-4 text-center">{success}</p>}
            <form onSubmit={handleResetPassword} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="password">Current Password</label>
                    <input
                        type="password"
                        id="oldpassword"
                        name="oldpassword"
                        value={form.oldPassword}
                        onChange={onChangeHandler}
                        className="w-full border border-gray-300 p-2 rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="password">New Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={form.password}
                        onChange={onChangeHandler}
                        className="w-full border border-gray-300 p-2 rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="confirmPassword">Confirm New Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={form.confirmPassword}
                        onChange={onChangeHandler}
                        className="w-full border border-gray-300 p-2 rounded"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
                >
                    Reset Password
                </button>
            </form>
        </div>
    );

};

export default ResetPassword;