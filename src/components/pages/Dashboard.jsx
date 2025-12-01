import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router";
import { AuthContext } from "../Firebase/AuthProvider";
import toast from "react-hot-toast";

export default function Dashboard() {
  const { user, orders, updateUserProfile } = useContext(AuthContext);

  // Load saved name and photo from localStorage or fallback to user info
  const [name, setName] = useState(localStorage.getItem("profileName") || user?.displayName || "");
  const [photoPreview, setPhotoPreview] = useState(localStorage.getItem("profileImage") || user?.photoURL || "");

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);               // Update preview
        localStorage.setItem("profileImage", reader.result); // Save to localStorage
      };
      reader.readAsDataURL(file); // Convert image to Base64
    }
  };

  const handleUpdateProfile = () => {
    updateUserProfile({ displayName: name, photoURL: photoPreview })
      .then(() => {
        localStorage.setItem("profileName", name); // Save name to localStorage
        toast.success("Profile Updated Successfully!");
      })
      .catch(err => toast.error(err.message || "Update failed"));
  };

  // Optional: sync with localStorage on mount
  useEffect(() => {
    const savedName = localStorage.getItem("profileName");
    const savedPhoto = localStorage.getItem("profileImage");
    if (savedName) setName(savedName);
    if (savedPhoto) setPhotoPreview(savedPhoto);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 mt-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Profile Card */}
      <div className="bg-base-200 p-8 rounded-2xl shadow-lg border border-base-300 mb-10">
        <div className="flex items-center gap-6">
          <img
            src={photoPreview || "https://via.placeholder.com/80"}
            alt="Profile"
            className="w-24 h-24 rounded-full ring-4 ring-primary/30 shadow-md object-cover"
          />

          <div>
            <h2 className="text-2xl font-semibold">{name || user?.email}</h2>
            <p className="text-sm opacity-70">{user?.email}</p>

            <div className="mt-4 flex gap-3">
              <Link to="/orderList" className="btn btn-primary btn-sm">
                My Orders ({orders.length})
              </Link>
              <Link to="/" className="btn btn-outline btn-sm">Back to Home</Link>
            </div>
          </div>
        </div>

        {/* Update Profile Section */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-3">Update Profile</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Update Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered w-full"
            />

            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="file-input file-input-bordered w-full"
            />
          </div>

          <button
            onClick={handleUpdateProfile}
            className="btn btn-primary w-full mt-4"
          >
            Save Changes
          </button>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Recent Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {orders.map(order => (
            <div key={order.id} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow flex justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                  <img src={order.image} alt={order.title} className="object-contain w-full h-full" />
                </div>
                <div>
                  <p className="font-semibold">{order.title}</p>
                  <p className="text-sm text-gray-500">{order.date}</p>
                </div>
              </div>
              <Link to={`/orders/${order.id}`} className="btn btn-outline btn-sm">View</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
