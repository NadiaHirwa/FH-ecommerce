import React, { useState } from 'react';
import '../EmployeeDashboard.css';

export const EmployeeProfile: React.FC = () => {
  const [profile, setProfile] = useState({
    name: 'John Employee',
    email: 'john.employee@example.com',
    phone: '+1 (555) 123-4567',
    role: 'Employee',
    joinDate: '2024-06-15',
    department: 'Sales',
  });

  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    phone: profile.phone,
  });

  const handleUpdate = () => {
    setProfile({ ...profile, phone: formData.phone });
    setEditing(false);
    alert('✅ Profile updated successfully!');
  };

  return (
    <div className="employee-page">
      <h1>Employee Profile</h1>

      <div className="profile-container">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="avatar-large">{profile.name.charAt(0).toUpperCase()}</div>
          <div className="profile-info">
            <h2>{profile.name}</h2>
            <p className="role-badge">{profile.role}</p>
          </div>
        </div>

        {/* Profile Details */}
        <div className="profile-details">
          <div className="detail-row">
            <label>Email:</label>
            <span>{profile.email}</span>
          </div>
          <div className="detail-row">
            <label>Phone:</label>
            <span>{profile.phone}</span>
          </div>
          <div className="detail-row">
            <label>Role:</label>
            <span>{profile.role} (Cannot be changed)</span>
          </div>
          <div className="detail-row">
            <label>Department:</label>
            <span>{profile.department}</span>
          </div>
          <div className="detail-row">
            <label>Join Date:</label>
            <span>{profile.joinDate}</span>
          </div>
        </div>

        {/* Edit Section */}
        {editing && (
          <div className="edit-section">
            <h3>Update Phone Number</h3>
            <div className="form-group">
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Enter new phone number"
              />
              <div className="form-actions">
                <button className="btn-primary" onClick={handleUpdate}>
                  Save Changes
                </button>
                <button
                  className="btn-secondary"
                  onClick={() => {
                    setEditing(false);
                    setFormData({ phone: profile.phone });
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {!editing && (
          <div className="profile-actions">
            <button className="btn-primary" onClick={() => setEditing(true)}>
              ✏️ Edit Phone Number
            </button>
          </div>
        )}

        {/* Restrictions Notice */}
        <div className="restrictions-box">
          <h3>⚠️ Restricted Actions</h3>
          <ul>
            <li>You cannot change your email</li>
            <li>You cannot change your role</li>
            <li>You cannot upload a profile picture</li>
            <li>Contact your manager for role changes</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
