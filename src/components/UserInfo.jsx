import React, { useEffect, useState } from "react";

const UserInfo = () => {
  const [user, setUser] = useState(null);

  // Fetch user info from your API
  useEffect(() => {
    fetch("https://your-api-url.com/api/user/info")
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.error("Error fetching user info:", err));
  }, []);

  if (!user) {
    return <p className="text-gray-500 text-center">Loading user info...</p>;
  }

  return (
    <div className="flex items-center gap-4 bg-pink-100 p-4 rounded-lg shadow">
      <img
        src={user.profileImage || "/default-avatar.png"}
        alt="User Avatar"
        className="w-16 h-16 rounded-full border border-pink-400"
      />
      <div>
        <h2 className="text-lg font-semibold">{user.name}</h2>
        <p className="text-sm text-gray-600">{user.email}</p>
        <p className="text-sm text-gray-600">Joined: {user.joinDate}</p>
      </div>
    </div>
  );
};

export default UserInfo;
