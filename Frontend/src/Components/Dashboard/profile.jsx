import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Context/authContext";

function profile() {
  const { logout, token } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:3002/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        setProfile(res.data);
      } catch (error) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [token]);

  if (loading) return <p>Loading profile...</p>;
  if (!user) return <p>Unable to load profile. Try again later.</p>;
  return (
    <div className="profile-page">
      <header>
        <h1>👤 Profile</h1>
      </header>

      <section className="profile-info">
        <p>
          <strong>Name:</strong>
          {profile.name}
        </p>
        <p>
          <strong>Email:</strong>
          {profile.email}
        </p>
        {profile.createdAt && (
          <p>
            <strong>Joined:</strong>{" "}
            {new Date(profile.createdAt).toLocaleDateString()}
          </p>
        )}
      </section>

      <section className="profile-stats">
        <h2>📊 Progress</h2>
        <p>
          <strong>Course Completed: </strong>
          {profile.completedCourses || 0} / {profile.totalCourses || 0}
        </p>
        <p>
          <strong>Level: </strong>
        </p>{" "}
        {profile.level || "Beginner"}
      </section>

      <section className="recent-activity">
        <h2>🕑 Recent activity</h2>
        {profile.recentActivity && profile.recentActivity.length > 0 ? (
          <ul>
            {profile.recentActivity.map((activity, i) => (
              <li key={i}>
                {activity.type === "completed" && "✅"}
                {activity.type === "started" && "🚀"}
                {activity.type === "achievement" && "🏆"} {activity.action} –{" "}
                {new Date(activity.time).toLocaleString()}
              </li>
            ))}
          </ul>
        ) : (
          <p>No recent activity yet.</p>
        )}
      </section>

      <button onClick={logout} className="logout-btn">
        🚪 Logout
      </button>
    </div>
  );
}

export default profile;
