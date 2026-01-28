import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import './ProfileSettings.css';

const ProfileSettings: React.FC = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    bio: '',
    location: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('Profile updated successfully!');
    setIsEditing(false);
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="profile-page">
      <div className="page-header">
        <h1>Profile Settings</h1>
        <p>Update your personal information</p>
      </div>

      {message && (
        <div className="success-message">
          ✓ {message}
        </div>
      )}

      <div className="profile-container">
        <form className="profile-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <h3>Personal Information</h3>

            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={!isEditing}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={!isEditing}
                className="form-input"
                placeholder="+1 (555) 000-0000"
              />
            </div>

            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                disabled={!isEditing}
                className="form-input"
                placeholder="City, State"
              />
            </div>

            <div className="form-group">
              <label htmlFor="bio">Bio</label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                disabled={!isEditing}
                className="form-input"
                placeholder="Tell us about yourself"
                rows={4}
              />
            </div>
          </div>

          <div className="form-actions">
            {!isEditing ? (
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
            ) : (
              <>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </form>

        <div className="profile-info">
          <div className="info-card">
            <h4>Account Status</h4>
            <p>
              <strong>Email Verified:</strong> {user?.isVerified ? '✓ Yes' : '✗ No'}
            </p>
            <p>
              <strong>Account Type:</strong> Standard User
            </p>
            <p>
              <strong>Member Since:</strong> January 2026
            </p>
          </div>

          <div className="info-card">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <a href="/dashboard/password">Change Password</a>
              </li>
              <li>
                <a href="/dashboard/addresses">Manage Addresses</a>
              </li>
              <li>
                <a href="/dashboard/orders">View Orders</a>
              </li>
              <li>
                <a href="/dashboard/wishlist">View Wishlist</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
