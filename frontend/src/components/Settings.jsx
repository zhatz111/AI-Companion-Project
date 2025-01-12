import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ConversationContext } from '../api/ConversationContext';
import { changeUserInfo, updatePersonalInfo, deleteConvos, deleteUserAccount, uploadImage } from "../api/apiService"

import { IoMdClose } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { BsPersonHeart } from "react-icons/bs";
import { BsDatabaseUp } from "react-icons/bs";
import { MdOutlineSecurity } from "react-icons/md";
import { AuthContext } from '../api/AuthContext';
import { IoIosArrowBack } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";




const Settings = ( { onClose, isSettingsVisible } ) => {

  const [activeTab, setActiveTab] = useState('General'); // State to track active tab
  const { user, token, updateUser, logout } = useContext(AuthContext);
  const [message, setMessage] = useState("");

  const { setCurrentConversation, setCurrentMessages, setConversationList } = useContext(ConversationContext);
  const navigate = useNavigate();

  const [editUsername, setEditUsername] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editPassword, setEditPassword] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [age, setAge] = useState("");
  const [heightFeet, setHeightFeet] = useState("");
  const [heightInches, setHeightInches] = useState("");
  const [weight, setWeight] = useState("");

  const [deleteChats, setDeleteChats] = useState(false);
  const [deleteAccount, setDeleteAccount] = useState(false);

  const [file, setFile] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);

  const MAX_SIZE_MB = 2; // Maximum file size in MB
  const MAX_DIMENSION = 400; // Max width/height

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file size (convert bytes to MB)
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      alert("File size exceeds the 1MB limit!");
      return;
    }

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/svg+xml"];
    if (!validTypes.includes(file.type)) {
      alert("Invalid file type. Please upload a PNG, JPG, or SVG file.");
      return;
    }

    // Read the file as a data URL
    const reader = new FileReader();
    reader.onload = () => setImageSrc(reader.result);
    reader.readAsDataURL(file);

    setFile(file);
  };

  const handleImageUpload = async (e) => {
    try {
        const response = await uploadImage(file, token);
        console.log("Image uploaded successfully:", response);
        alert("Image uploaded successfully!");
        updateUser(response)
      } catch (error) {
        alert("Failed to upload image. Please try again.");
      }
    };

  const handleInputChange = (e) => {
    const value = e.target.value;

    // Allow only digits and ensure it's greater than or equal to 18
    if (/^\d*$/.test(value) && (value === "" || parseInt(value, 10) >= 18)) {
      setAge(value);
    }
  };

  const handleDeleteChats = async () => {
    try {
        // Call the changeUserInfo function with the new username
        console.log(user);  // Log current user
        
        const deleted = await deleteConvos(token);

        console.log('Chat data deleted successfully!');
        setMessage(`${deleted.deleted_conversations_count} convos and ${deleted.deleted_messages_count} messages deleted!`);
        setCurrentConversation(null)
        setCurrentMessages([])
        setConversationList([])
        navigate('/')

        // Optionally, you can update the UI or show a success message
    } catch (err) {
        console.error('Error deleting conversations:', err.message);
        setMessage(err.message);
    }
  };

  const handleDeleteAccount = async () => {
    try {
        // Call the changeUserInfo function with the new username
        console.log(user);  // Log current user
        await deleteUserAccount(token);

        console.log('Account data deleted successfully!');

        onClose()
        logout()

        // Optionally, you can update the UI or show a success message
    } catch (err) {
        console.error('Error deleting account:', err.message);
        setMessage(err.message);
        // Optionally, you can show an error message to the user
    }
  };

  const handleSaveUserChanges = async () => {
    try {
        // Call the changeUserInfo function with the new username
        console.log(user);  // Log current user
        const updatedUser = await changeUserInfo(username, email, password, token);

        console.log('User info updated successfully:');
        setMessage("Change Successful!");

        // Update the context and local storage with the new user data
        updateUser(updatedUser); // Assuming you have access to updateUser from context

        if (email !== "") {
            // The email is not an empty string
            console.log(`Email was changed to ${email}, logging out...`);
            onClose()
            logout()
          }

        // Optionally, reset the edit states
        setEditUsername(false);
        setEditEmail(false);
        setEditPassword(false);

        setUsername("");
        setEmail("");
        setPassword("");

        setMessage("")

        // Optionally, you can update the UI or show a success message
    } catch (err) {
        console.error('Error updating user info:', err.message);
        setMessage(err.message);

        // Optionally, reset the data states
        setUsername("");
        setEmail("");
        setPassword("");
        // Optionally, you can show an error message to the user
    }
  };

  const handleSavePersonalChanges = async () => {
    try {
        // Call the changeUserInfo function with the new username
        const updatedUser = await updatePersonalInfo(
            age,
            heightFeet,
            heightInches,
            weight,
            selectedValues.gender,
            selectedValues.identity,
            selectedValues.sexuality,
            selectedValues.politics,
            token
        );

        console.log('Personal info updated successfully:');
        setMessage("Change Successful!");

        // Update the context and local storage with the new user data
        updateUser(updatedUser); // Assuming you have access to updateUser from context

        // Optionally, reset the edit states
        setEditUsername(false);
        setEditEmail(false);
        setEditPassword(false);

        setUsername("");
        setEmail("");
        setPassword("");

        setMessage("")

        // Optionally, you can update the UI or show a success message
    } catch (err) {
        console.error('Error updating personal info:', err.message);
        setMessage(err.message);

        // Optionally, reset the data states
        setUsername("");
        setEmail("");
        setPassword("");
        // Optionally, you can show an error message to the user
    }
  };

  // Reset isEditing whenever the activeTab changes
  useEffect(() => {
    setEditUsername(false);
    setEditEmail(false);
    setEditPassword(false);

    setMessage("");

    setUsername("");
    setEmail("");
    setPassword("");

    setAge("")
    setHeightFeet("")
    setHeightInches("")
    setWeight("")

    setDeleteChats(false)
    setDeleteAccount(false)

    setFile(null)
    setImageSrc(null)

    resetSelectedValues()
    }, [activeTab, onClose]);
  
  // State to track which dropdown is open and its selected value
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedValues, setSelectedValues] = useState({
    gender: '',
    identity: '',
    sexuality: '',
    politics: '',
  });

  const resetSelectedValues = () => {
    setSelectedValues({
      gender: '',
      identity: '',
      sexuality: '',
      politics: '',
    });
  };

  // Toggle dropdown function
  const toggleDropdown = (dropdown) => {
    setOpenDropdown((prev) => (prev === dropdown ? null : dropdown));
  };

  // Handle selection
  const handleSelect = (dropdown, value) => {
    setSelectedValues((prev) => ({ ...prev, [dropdown]: value }));
    setOpenDropdown(null); // Close dropdown after selection
  };

  // Helper function to render content based on the active tab
  const renderContent = () => {
    switch (activeTab) {
    case 'General':
        return (
            <div className='flex flex-col w-full gap-3 px-4 pb-2 text-sm text-token-text-primary justify-between'>
                
                <div className="border-b border-gray-500/60 pb-3">
                    <div className="border-b border-gray-500/60 pb-3">
                    <label 
                        className="block mb-2 ml-1 text-sm font-sm text-gray-300" 
                        htmlFor="file_input"
                        >
                        Upload Profile Pic
                        </label>
                        <div className='flex flex-row items-center pt-1 gap-3'>
                            {user.image_url ? (
                            <img
                                src={user.image_url}
                                className="object-cover rounded-full h-12 w-12 flex-shrink-0"
                                alt="Profile"
                            />
                            ) : (
                            <FaUserCircle size={30} />
                            )}
                            <input
                            className="block w-full h-full file:p-3 text-xs rounded-lg text-gray-400 bg-gray-500/60 file:rounded-l-lg file:text-white file:bg-[#121212] file:border-none file:cursor-pointer cursor-pointer"
                            aria-describedby="file_input_help"
                            id="file_input"
                            type="file"
                            onChange={handleFileChange}
                            />
                        </div>
                        <div className='flex flex-row items-center justify-between pt-3'>
                            <p className="mt-2 text-xs ml-1 text-gray-300" id="file_input_help">
                            SVG, PNG, or JPG (MAX. 1mb).
                            </p>
                            <button
                                className="btn relative btn-secondary shrink-0 pr-1"
                                onClick={handleImageUpload}
                            >
                                <div className="flex items-center hover:bg-gray-500 py-2 px-3 border border-gray-500 rounded-full justify-center">
                                    Upload
                                </div>
                            </button>
                        </div>
                    </div>
                        <div className="flex items-center pt-3 justify-between">
                        {editUsername ? (
                        <div className='flex flex-col items-center justify-center'>
                            <div className='flex flex-row items-center justify-center gap-4'>
                            {/* Arrow button to go back */}
                            <IoIosArrowBack
                                className='font-white cursor-pointer'
                                size={20} 
                                onClick={() => setEditUsername(false)}
                            />
                            <div className='flex flex-row gap-4'>
                                <input 
                                    type="text" 
                                    id="username_input" 
                                    className="text-sm rounded-lg w-full max-w-sm outline-none block p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white" 
                                    placeholder={user.username}
                                    value={username} // Bind the input value to state
                                    onChange={(e) => setUsername(e.target.value)} // Update state on input change
                                    required
                                />
                                <button 
                                    className="btn relative btn-secondary shrink-0" 
                                    data-testid="manage-archived-conversations-button"
                                    onClick={handleSaveUserChanges} // Attach the onClick handler
                                >
                                    <div className="flex items-center hover:bg-[#FF6FCF] hover:text-white py-2 px-3 border border-[#FF6FCF] rounded-full text-[#FF6FCF] justify-center">
                                        Save Changes
                                    </div>
                                </button>                                
                            </div>
                            </div>
                            {message && <p className="mt-4 text-gray-500 text-sm">{message}</p>}
                        </div>
                    ) : (
                        <>
                            <div>
                                <div>Username</div>
                                <div className='text-gray-500'>{user.username}</div>
                            </div>
                            <button 
                                className="btn relative btn-secondary shrink-0"
                                onClick={() => setEditUsername(true)}
                            >
                                <div className="flex items-center hover:bg-gray-500 py-2 px-3 border border-gray-500 rounded-full justify-center">
                                    Change
                                </div>
                            </button>
                        </>
                    )}
                    </div>
                </div>
                <div className="border-b border-gray-500/60 pb-3">
                    <div className="flex items-center justify-between">
                    {editEmail ? (
                        <div className='flex flex-col items-center justify-center'>
                            <div className='flex flex-row items-center justify-center gap-4'>
                                {/* Arrow button to go back */}
                                <IoIosArrowBack 
                                    className='font-white cursor-pointer' 
                                    size={20} 
                                    onClick={() => setEditEmail(false)} 
                                />
                                <div className='flex flex-row gap-4'>
                                    <input 
                                        type="text" 
                                        id="username_input" 
                                        className="text-sm rounded-lg w-full max-w-sm outline-none block p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white" 
                                        placeholder={user.email} 
                                        value={email} // Bind the input value to state
                                        onChange={(e) => setEmail(e.target.value)} // Update state on input change
                                        required 
                                    />
                                    <button 
                                        className="btn relative btn-secondary shrink-0" 
                                        data-testid="manage-archived-conversations-button"
                                        onClick={handleSaveUserChanges} // Attach the onClick handler
                                    >
                                        <div className="flex items-center hover:bg-[#FF6FCF] hover:text-white py-2 px-3 border border-[#FF6FCF] rounded-full text-[#FF6FCF] justify-center">
                                            Save Changes
                                        </div>
                                    </button>
                                </div>
                            </div>
                            {message && <p className="mt-4 text-gray-500 text-sm">{message}</p>}
                        </div>
                    ) : (
                        <>
                            <div>
                                <div>Email (Requires Logout)</div>
                                <div className='text-gray-500'>{user.email}</div>
                            </div>
                            <button 
                                className="btn relative btn-secondary shrink-0" 
                                onClick={() => setEditEmail(true)}
                            >
                                <div className="flex items-center hover:bg-gray-500 py-2 px-3 border border-gray-500 rounded-full justify-center">
                                    Change
                                </div>
                            </button>
                        </>
                    )}
                    </div>
                </div>
                
                {/* <div className="border-b border-gray-500/60 pb-4 pt-2 pr-4">
                    <div className="flex items-center justify-between">
                        <div>Allow personal data to enhance AI prompts</div>
                            <button type="button" 
                            role="switch" 
                            aria-checked="false" 
                            data-state="unchecked" 
                            value="on" 
                            aria-label="Allow personal data to enhance AI prompts"
                            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-token-text-secondary focus-visible:ring-offset-2 focus-visible:radix-state-checked:ring-black focus-visible:ring-token-main-surface-primary focus-visible:radix-state-checked:ring-green-600 cursor-pointer bg-gray-200 radix-state-checked:bg-black border border-token-border-medium bg-transparent relative shrink-0 rounded-full radix-state-checked:border-green-600 radix-state-checked:bg-green-600 h-[20px] w-[32px]"
                            >
                                <span data-state="unchecked" className="flex items-center justify-center rounded-full transition-transform duration-100 will-change-transform ltr:translate-x-0.5 rtl:-translate-x-0.5 bg-white h-[16px] w-[16px] ltr:radix-state-checked:translate-x-[14px] rtl:radix-state-checked:translate-x-[-14px]">
                                </span>
                            </button>
                        </div>
                </div> */}

            </div>
        );
    case 'Personalization':
        return (
                        <div className='flex flex-col w-full gap-3 px-4 pb-2 text-sm text-token-text-primary justify-between'>
                            <div className='flex gap-28 flex-row text-nowrap items-center justify-between border-b border-gray-500 pb-4 pt-2'>
                                <div className='flex flex-row'>
                                    <label htmlFor="age" className="block text-sm font-medium text-white">Age</label>
                                    {/* Add a fixed width and text alignment */}
                                    <div className='px-4 w-12  text-gray-500'>(18 years or older)</div>
                                </div>
                                <div className='flex flex-row'>
                                    <input 
                                        type="number"
                                        min="18"
                                        id="age"
                                        value={age}
                                        onChange={handleInputChange}
                                        className="text-sm rounded-lg w-full max-w-sm outline-none block p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white" 
                                        placeholder={user.age != null ? `${user.age} years old` : "Years"}
                                        required 
                                    />
                                </div>
                            </div>

                            <div className='flex gap-36 flex-row text-nowrap items-center justify-center border-b border-gray-500 pb-4 pt-2'>
                                <div className='flex flex-row'>
                                    <label htmlFor="height" className="block mb-2 text-sm font-medium text-white">Height</label>
                                </div>
                                <div className='flex gap-2 flex-row'>
                                    <input 
                                        type="number"
                                        min="1"
                                        max="7"
                                        id="height_feet" 
                                        value={heightFeet}
                                        onChange={(e) => setHeightFeet(e.target.value)}
                                        className="text-sm rounded-lg w-full max-w-sm outline-none block p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white" 
                                        placeholder={user.height_feet != null ? `${user.height_feet} foot` : "Feet"}
                                        required 
                                    />
                                    <input 
                                        type="number"
                                        min="0"
                                        max="11"
                                        id="height_inches" 
                                        value={heightInches}
                                        onChange={(e) => setHeightInches(e.target.value)}
                                        className="text-sm rounded-lg w-full max-w-sm outline-none block p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                                        placeholder={user.height_inches != null ? `${user.height_inches}` : "Inches"}
                                        required 
                                    />
                                </div>
                            </div>

                            <div className='flex gap-36 flex-row text-nowrap items-center justify-center border-b border-gray-500 pb-4 pt-2'>
                                <div className='flex flex-row'>
                                    <label htmlFor="weight" className="block mb-2 text-sm font-medium text-white">Weight</label>
                                </div>
                                <div className='flex gap-4 flex-row'>
                                    <input 
                                        type="number"
                                        min="1"
                                        id="weight"
                                        value={weight}
                                        onChange={(e) => setWeight(e.target.value)}
                                        className="text-sm rounded-lg w-full max-w-sm outline-none block p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white" 
                                        placeholder={user.weight != null ? `${user.weight} lbs` : "lbs"}
                                        required 
                                    />
                                </div>
                            </div>

                        {/* Gender Dropdown */}
                        <div className="border-b border-gray-500/60 pb-3">
                            <div className="flex items-center justify-between">
                            <div>Gender</div>
                            <div className="relative">
                                <button
                                onClick={() => toggleDropdown('gender')}
                                className="text-white outline-none font-base text-sm px-5 py-2.5 text-center inline-flex items-center"
                                type="button"
                                >
                                <p className='text-gray-500'>{user.gender != null ? `${user.gender}` : `${selectedValues.gender}`}</p>
                                <svg
                                    className="w-3 h-3 ms-3 hover:text-gray-500/60"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 10 6"
                                >
                                    <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 1 4 4 4-4"
                                    />
                                </svg>
                                </button>
                                {openDropdown === 'gender' && (
                                <div className="z-10 absolute right-0 divide-y divide-gray-100 rounded-2xl shadow w-40 bg-gray-700">
                                    <ul className="py-2 text-sm bg-black rounded-2xl text-gray-200 px-2">
                                    {["", 'Male', 'Female', 'Nonbinary'].map((option) => (
                                        <li key={option}>
                                        <button
                                            className="block w-full text-left px-4 py-2 rounded-lg hover:text-[#FF6FCF]"
                                            onClick={() => handleSelect('gender', option)}
                                        >
                                            {option}
                                        </button>
                                        </li>
                                    ))}
                                    </ul>
                                </div>
                                )}
                            </div>
                            </div>
                        </div>

                        {/* Identity Dropdown */}
                        <div className="border-b border-gray-500/60 pb-3">
                            <div className="flex items-center justify-between">
                            <div>Identity</div>
                            <div className="relative">
                                <button
                                onClick={() => toggleDropdown('identity')}
                                className="text-white outline-none font-base rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                                type="button"
                                >
                                <p className='text-gray-500'>{user.identity != null ? `${user.identity}` : `${selectedValues.identity}`}</p>
                                <svg
                                    className="w-3 h-3 ms-3 hover:text-gray-500/60"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 10 6"
                                >
                                    <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 1 4 4 4-4"
                                    />
                                </svg>
                                </button>
                                {openDropdown === 'identity' && (
                                <div className="z-10 absolute divide-y right-0 divide-gray-100 rounded-2xl shadow w-44 bg-gray-700 ">
                                    <ul className="py-2 text-sm bg-black rounded-2xl text-gray-200 px-2 max-h-48 overflow-y-auto no-scrollbar">
                                    {["", "Cisgender", 'Genderfluid', 'Bigender', 'Transgender', 'Agender', "Genderqueer", "Demigender", "Gender Questioning", "Intersex", "Non-Binary", "Omnigender"].map((option) => (
                                        <li key={option}>
                                        <button
                                            className="block w-full h-full text-left px-4 py-2 rounded-lg hover:text-[#FF6FCF]"
                                            onClick={() => handleSelect('identity', option)}
                                        >
                                            {option}
                                        </button>
                                        </li>
                                    ))}
                                    </ul>
                                </div>
                                )}
                            </div>
                            </div>
                        </div>

                        {/* Sexuality Dropdown */}
                        <div className="border-b border-gray-500/60 pb-3">
                            <div className="flex items-center justify-between">
                            <div>Sexuality</div>
                            <div className="relative">
                                <button
                                onClick={() => toggleDropdown('sexuality')}
                                className="text-white outline-none font-base rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                                type="button"
                                >
                                <p className='text-gray-500'>{user.sexuality != null ? `${user.sexuality}` : `${selectedValues.sexuality}`}</p>
                                <svg
                                    className="w-3 h-3 ms-3 hover:text-gray-500/60"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 10 6"
                                >
                                    <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 1 4 4 4-4"
                                    />
                                </svg>
                                </button>
                                {openDropdown === 'sexuality' && (
                                <div className="z-10 absolute divide-y right-0 divide-gray-100 rounded-2xl shadow w-44 bg-gray-700">
                                    <ul className="py-2 text-sm bg-black rounded-2xl text-gray-200 px-2">
                                    {["", 'Straight', 'Gay', 'Lesbian', 'Bisexual'].map((option) => (
                                        <li key={option}>
                                        <button
                                            className="block w-full text-left px-4 py-2 rounded-lg hover:text-[#FF6FCF]"
                                            onClick={() => handleSelect('sexuality', option)}
                                        >
                                            {option}
                                        </button>
                                        </li>
                                    ))}
                                    </ul>
                                </div>
                                )}
                            </div>
                            </div>
                        </div>

                {/* Politics Dropdown */}
                <div className="border-b border-gray-500/60 pb-3">
                    <div className="flex items-center justify-between">
                    <div>Politics</div>
                    <div className="relative">
                        <button
                        onClick={() => toggleDropdown('politics')}
                        className="text-white outline-none font-base rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                        type="button"
                        >
                        <p className='text-gray-500'>{user.politics != null ? `${user.politics}` : `${selectedValues.politics}`}</p>
                        <svg
                            className="w-3 h-3 ms-3 hover:text-gray-500/60"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 10 6"
                        >
                            <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 1 4 4 4-4"
                            />
                        </svg>
                        </button>
                        {openDropdown === 'politics' && (
                        <div className="z-10 absolute divide-y right-0 divide-gray-100 rounded-2xl shadow w-44 bg-gray-700">
                            <ul className="py-2 text-sm bg-black rounded-2xl text-gray-200 px-2">
                            {["", 'Liberal', 'Moderate', 'Conservative'].map((option) => (
                                <li key={option}>
                                <button
                                    className="block w-full text-left px-4 py-2 rounded-lg hover:text-[#FF6FCF]"
                                    onClick={() => handleSelect('politics', option)}
                                >
                                    {option}
                                </button>
                                </li>
                            ))}
                            </ul>
                        </div>
                        )}
                    </div>
                    </div>
                </div>
            <div className="pb-4 pt-2 flex items-center justify-between">
                <div className="flex items-center justify-between">
                    <button className="btn relative btn-secondary shrink-0" data-testid="manage-archived-conversations-button" onClick={handleSavePersonalChanges}>
                        <div className="flex items-center hover:bg-[#FF6FCF] hover:text-white py-2 px-3 border border-[#FF6FCF] rounded-full text-[#FF6FCF] justify-center">Save Changes</div>
                    </button>
                </div>
            </div>
        </div>
        );
    case 'Data Controls':
        return (
            <div className="flex flex-col w-full gap-3 px-4 pb-2 text-sm text-token-text-primary">
                {/* <div className="border-b border-gray-500 pb-4 pt-2">
                    <div className="flex items-center justify-between">
                        <div>Data Export</div>
                        <button type="button" className="btn relative btn-secondary shrink-0">Export Data</button>
                    </div>
                </div> */}
                <div className="border-b border-gray-500 pb-4 pt-2">
                    <div className="flex items-center justify-between"><div>
                    <div>Delete All Chats</div>
                    </div>
                    {!deleteChats ? (
                        <button className="btn relative btn-secondary shrink-0" data-testid="manage-archived-conversations-button" onClick={() => setDeleteChats(true)}>
                            <div className="flex items-center hover:text-[#C41E3A] py-2 px-3 rounded-full text-[#C41E3A]/80 justify-center">Delete Chats</div>
                        </button>
                    ) : (
                        <div className='flex flex-row items-center'>
                        <IoClose 
                            className='text-white cursor-pointer hover:text-gray-300/50' 
                            size={25} 
                            onClick={() => setDeleteChats(false)}
                        />
                        <div className='flex flex-col items-center'>
                        <button className="btn relative btn-secondary shrink-0" data-testid="manage-archived-conversations-button" onClick={handleDeleteChats}>
                            <div className="flex items-center hover:text-[#C41E3A] py-2 px-3 rounded-full text-[#C41E3A]/80 justify-center">Confirm Delete Chats</div>
                        </button>
                        {message ? (
                        <p className="text-gray-400 text-xs">{message}</p>
                        ) : (
                        // Optionally, you can render something else if message is not set
                        <p className='text-gray-400 text-xs'>Action is irreversible!!</p>
                        )}
                        </div>
                        </div>
                    )}
                    </div>
                </div>
                <div className="border-b border-gray-500 pb-4 pt-2">
                    <div className="flex items-center justify-between"><div>
                    <div>Delete Account</div>
                    </div>
                    {!deleteAccount ? (
                        <button className="btn relative btn-secondary shrink-0" data-testid="manage-archived-conversations-button" onClick={() => setDeleteAccount(true)}>
                            <div className="flex items-center hover:text-[#C41E3A] py-2 px-3 rounded-full text-[#C41E3A]/80 justify-center">Delete Account</div>
                        </button>
                    ) : (
                        <div className='flex flex-row items-center'>
                        <IoClose 
                            className='text-white cursor-pointer hover:text-gray-300/50' 
                            size={25} 
                            onClick={() => setDeleteAccount(false)}
                        />
                        <div className='flex flex-col items-center'>
                        <button className="btn relative btn-secondary shrink-0" data-testid="manage-archived-conversations-button" onClick={handleDeleteAccount}> 
                            <div className="flex items-center hover:text-[#C41E3A] py-2 px-3 rounded-full text-[#C41E3A]/80 justify-center">Confirm Delete Account</div>
                        </button>
                        {message ? (
                        <p className="text-gray-400 text-xs">{message}</p>
                        ) : (
                        // Optionally, you can render something else if message is not set
                        <p className='text-gray-400 text-xs'>Action is irreversible!!</p>
                        )}
                        </div>
                        </div>
                    )}
                    </div>
                </div>
            </div>
          
        );
    case 'Security':
        return (
          <div className="flex flex-col w-full gap-3 px-4 pb-2 text-sm text-token-text-primary">
            <div className="border-b border-gray-500/60 pb-3">
                <div className="flex items-center justify-between">
                {editPassword ? (
                        <>
                            {/* Arrow button to go back */}
                            <IoIosArrowBack 
                                className='font-white cursor-pointer' 
                                size={20} 
                                onClick={() => setEditPassword(false)}
                            />
                            <div className='flex flex-row gap-12'>
                                <input 
                                    type="text" 
                                    id="username_input" 
                                    className="text-sm rounded-lg w-full max-w-sm outline-none block p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white" 
                                    placeholder="•••••••••"
                                    value={password} // Bind the input value to state
                                    onChange={(e) => setPassword(e.target.value)} // Update state on input change
                                    required
                                />
                                <button 
                                    className="btn relative btn-secondary shrink-0" 
                                    data-testid="manage-archived-conversations-button"
                                    onClick={handleSaveUserChanges} // Attach the onClick handler
                                >
                                    <div className="flex items-center hover:bg-[#50C878] hover:text-white py-2 px-3 border border-[#50C878] rounded-full text-[#50C878] justify-center">
                                        Update
                                    </div>
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div>Change Password</div>
                            <button 
                                className="btn relative btn-secondary shrink-0"
                                onClick={() => setEditPassword(true)}
                            >
                                <div className="flex items-center hover:bg-gray-500 py-2 px-3 border border-gray-500 rounded-full justify-center">
                                    Update
                                </div>
                            </button>
                        </>
                    )}
                </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // Conditional rendering based on isSettingsVisible
  if (!isSettingsVisible) return null;

  return (
    <div className="bg-black bg-opacity-80 fixed inset-0 flex items-center justify-center z-50" onClick={onClose}>
        <div className="bg-[#212121] text-gray-100 rounded-2xl w-full max-w-xl shadow-lg" onClick={(e) => e.stopPropagation()}>
        <div className="border-b flex-row flex items-center justify-between border-[#FF6FCF] p-6">
            <h2 className="text-2xl font-semibold text-[#FF6FCF]">Settings</h2>
            <IoMdClose
            className="hover:bg-gray-500 p-2 rounded-full text-[#FF6FCF] cursor-pointer"
            size={35}
            onClick={onClose} // Add a close handler here
            />
        </div>
        <div className="flex flex-row gap-8 p-4">
            <div className="flex flex-col">
            <button
                className={`p-2 my-1 flex items-center text-sm text-white text-nowrap rounded-lg ${
                activeTab === 'General' ? 'bg-gray-500/50' : ''
                }`}
                onClick={() => setActiveTab('General')}
            >
                <div className="flex items-center justify-center pr-1">
                <IoSettingsOutline size={15} />
                </div>
                <div className="flex items-center justify-center px-1">General</div>
            </button>
    
            <button
                className={`p-2 my-1 flex items-center text-sm text-nowrap text-white rounded-lg ${
                activeTab === 'Personalization' ? 'bg-gray-500/50' : ''
                }`}
                onClick={() => setActiveTab('Personalization')}
            >
                <div className="flex items-center justify-center pr-1">
                <BsPersonHeart size={15} />
                </div>
                <div className="flex items-center justify-center px-1">Personalization</div>
            </button>
    
            <button
                className={`p-2 my-1 flex items-center text-sm text-nowrap text-white rounded-lg ${
                activeTab === 'Data Controls' ? 'bg-gray-500/50' : ''
                }`}
                onClick={() => setActiveTab('Data Controls')}
            >
                <div className="flex items-center justify-center pr-1">
                <BsDatabaseUp size={15} />
                </div>
                <div className="flex items-center justify-center px-1">Data Controls</div>
            </button>
    
            <button
                className={`p-2 my-1 flex items-center text-sm text-nowrap text-white rounded-lg ${
                activeTab === 'Security' ? 'bg-gray-500/50' : ''
                }`}
                onClick={() => setActiveTab('Security')}
            >
                <div className="flex items-center justify-center pr-1">
                <MdOutlineSecurity size={15} />
                </div>
                <div className="flex items-center justify-center px-1">Security</div>
            </button>
            </div>
            <div className="w-full" >{renderContent()}</div>
        </div>
        </div>
    </div>
  );
};

export default Settings;
