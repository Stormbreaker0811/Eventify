import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/ProfilePage.css';
import backicon from '../Assets/back.png';


const ProfilePage = () => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [gender, setGender] = useState("");

  const togglePasswordFields = () => {
    setShowPasswordFields(!showPasswordFields);
  };

  return (
    <div className="profile-page-container">
      <div className="left-column">
        {/* Back button */}
        <Link to="/home" className="back-button">
          <img src={backicon} alt="Back" className="back-icon" />
        </Link>
        {/* Profile */}
        <button onClick={() => setShowPasswordFields(false)} className="left-button">
          Profile
        </button>
        {/* Change password option */}
        <button onClick={togglePasswordFields} className="left-button">
          Password
        </button>
        {/* Theme change option */}
        <Link to="/change-theme" className="theme-button">
          Dark Theme
        </Link>
      </div>

      <div className="right-column">
        {/* Content for right column (3/4 of page) */}
        {showPasswordFields ? (
          <>
            <h2 className="profile-heading">Change Password</h2>
            <div className="input-container">
              <label htmlFor="emailOrPhone" className="label">Email or Phone:</label>
              <input type="text" id="emailOrPhone" value={emailOrPhone} onChange={(e) => setEmailOrPhone(e.target.value)} className="input-field" placeholder="Enter email or phone" />
            </div>
            <div className="input-container">
              <label htmlFor="otp" className="label">OTP:</label>
              <input type="text" id="otp" value={otp} onChange={(e) => setOtp(e.target.value)} className="input-field" placeholder="Enter OTP" />
            </div>
            <div className="input-container">
              <label htmlFor="newPassword" className="label">New Password:</label>
              <input type="password" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="input-field" placeholder="Enter new password" />
            </div>
            <div className="input-container">
              <label htmlFor="confirmPassword" className="label">Confirm Password:</label>
              <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="input-field" placeholder="Confirm new password" />
            </div>
          </>
        ) : (
          <>
            <h2 className="profile-heading">Edit Profile</h2>
            <div className="input-container">
              <label htmlFor="name" className="label">Name:</label>
              <input type="text" id="name" className="input-field" placeholder="Enter your name" />
            </div>
            <div className="input-container">
              <label htmlFor="email" className="label">Email:</label>
              <input type="text" id="email" className="input-field" placeholder="Enter your email" />
            </div>
            <div className="input-container">
              <label htmlFor="phone" className="label">Phone Number:</label>
              <input type="text" id="phone" className="input-field" placeholder="Enter your Phone no." />
            </div>
            <div className="input-container">
              <label htmlFor="age" className="label">Age:</label>
              <input type="text" id="age" className="input-field" placeholder="Enter your age" />
            </div>
            <div className="input-container">
              <label htmlFor="gender" className="label">Gender:</label>
              {/* Dropdown list for gender selection */}
              <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)} className="input-field">
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="input-container">
              <label htmlFor="country" className="label">Country:</label>
              <input type="text" id="country" className="input-field" placeholder="India" readOnly />
            </div>
            <div className="input-container">
              <label htmlFor="city" className="label">City:</label>
              <input type="text" id="city" className="input-field" placeholder="Enter your city" />
            </div>
          </>
        )}
        
        {/* Option to save changes */}
        <button className="save-button">Save Changes</button>
      </div>
    </div>
  );
}

export default ProfilePage;
