import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { resetPassword } from '../api/apiService'; // Import your resetPassword API call
import { RiLockPasswordLine } from "react-icons/ri";

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const [newPassword, setNewPassword] = useState({ new: "", confirmNew: "" });
  const [message, setMessage] = useState("");
//   const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const tokenFromUrl = searchParams.get('token'); // Extract token from the URL
    if (tokenFromUrl) {
      setToken(tokenFromUrl); // Save the token in state
    }
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPassword({ ...newPassword, [name]: value });
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(newPassword.new)
    try {
      const response = await resetPassword(newPassword.new, newPassword.confirmNew, token);
      console.log('Password reset successful:', response);
      setMessage("Password was reset successfully!");
      setNewPassword({ new: "", confirmNew: "" });
      navigate('/');
      // Redirect to login page or show success message
    } catch (error) {
      console.error('Password reset failed:', error);
    }
  };

  return (
    <div>
        <div
            className="fixed inset-0 flex items-center justify-center bg-[#212121]"
        >
            <div
                className="bg-[#121212] rounded-lg p-8 shadow-lg w-full max-w-md"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
                <h2
                    href="/"
                    className="flex items-center mb-6 text-2xl font-semibold text-white"
                >
                    Reset Password
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                    <div>
                        <RiLockPasswordLine size="20" className='absolute text-gray-400 mt-3 ml-3' />
                        <input
                            type="password"
                            name="new" // Add this to link to the "new" key in the state
                            placeholder="New Password"
                            value={newPassword.new}
                            onChange={handleChange}
                            required
                            className="rounded-md outline-none pl-10 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <RiLockPasswordLine size="20" className='absolute text-gray-400 mt-3 ml-3' />
                        <input
                            type="password"
                            name="confirmNew" // Add this to link to the "confirmNew" key in the state
                            placeholder="Confirm New Password"
                            value={newPassword.confirmNew}
                            onChange={handleChange}
                            required
                            className="rounded-md outline-none pl-10 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full outline-none text-white bg-[#FF6FCF] hover:bg-[#FF6FCF] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                        Reset Password
                    </button>
                    {message && <p className="mt-4 text-white text-sm">{message}</p>}
                </form>
            </div>
        </div>
    </div>
    
  );
};

export default ResetPasswordPage;
