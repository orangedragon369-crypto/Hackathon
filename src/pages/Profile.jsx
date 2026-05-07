import "./profile.css";

export default function Profile() {
  return (
    <div className="profile-container">

      {/* LEFT SIDEBAR */}
      <div className="profile-sidebar">

        <div className="profile-avatar">
          <div className="avatar-circle">U</div>
          <h3>User Name</h3>
          <p>user@email.com</p>
        </div>

        <div className="profile-menu">
          <div className="menu-item">Overview</div>
          <div className="menu-item">Settings</div>
          <div className="menu-item">Security</div>
          <div className="menu-item">Activity</div>
        </div>

      </div>

      {/* MAIN CONTENT */}
      <div className="profile-main">

        <div className="profile-header">
          <h2>Profile Overview</h2>
        </div>

        {/* INFO CARD */}
        <div className="profile-card">
          <h3>Personal Information</h3>

          <div className="info-row">
            <label>Full Name</label>
            <div className="value">User Name</div>
          </div>

          <div className="info-row">
            <label>Email</label>
            <div className="value">user@email.com</div>
          </div>

          <div className="info-row">
            <label>Role</label>
            <div className="value">Student / Developer</div>
          </div>

          <button className="edit-btn">Edit Profile</button>
        </div>

        {/* ACTIVITY SECTION */}
        <div className="profile-card">
          <h3>Recent Activity</h3>

          <div className="activity-item">
            Logged into system
          </div>

          <div className="activity-item">
            Updated calendar event
          </div>

          <div className="activity-item">
            Viewed job postings
          </div>

        </div>

      </div>
    </div>
  );
}