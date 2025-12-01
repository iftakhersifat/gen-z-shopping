import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router";
import { AuthContext } from "../Firebase/AuthProvider";
import toast from "react-hot-toast";

export default function Dashboard() {
  const { user, orders, updateUserProfile } = useContext(AuthContext);

  const [name, setName] = useState(localStorage.getItem("profileName") || user?.displayName || "");
  const [photoPreview, setPhotoPreview] = useState(localStorage.getItem("profileImage") || user?.photoURL || "");

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
        localStorage.setItem("profileImage", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProfile = () => {
    updateUserProfile({ displayName: name, photoURL: photoPreview })
      .then(() => {
        localStorage.setItem("profileName", name);
        toast.success("Profile Updated Successfully!");
      })
      .catch(err => toast.error(err.message || "Update failed"));
  };

  useEffect(() => {
    const savedName = localStorage.getItem("profileName");
    const savedPhoto = localStorage.getItem("profileImage");
    if (savedName) setName(savedName);
    if (savedPhoto) setPhotoPreview(savedPhoto);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 mt-12">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12 bg-linear-to-r from-violet-500 via-pink-500 to-rose-500 bg-clip-text text-transparent ">Dashboard
      <div className="mt-2 w-20 h-0.5 mx-auto bg-linear-to-r from-violet-500 to-rose-500  opacity-80 rounded-full"></div>
      </h2>

{/* main part */}
    <div className="bg-linear-to-br from-violet-50 to-purple-100 p-8 rounded-3xl border border-violet-200">
      {/* image & others section */}
    <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6 text-center md:text-left">
    
    <img src={photoPreview} alt="Profile" className="w-28 h-28 rounded-full shadow-lg object-cover ring-4 ring-violet-300"/>

    <div>
      <h2 className="text-3xl font-bold bg-linear-to-r from-violet-600 to-purple-700 bg-clip-text text-transparent">{name || user?.email}</h2>

      <p className="text-gray-600 mt-1">{user?.email}</p>

      <div className="mt-4 flex gap-3">
        <Link to="/orderList" className="btn btn-sm bg-linear-to-r from-violet-600 to-purple-700 text-white rounded-lg shadow">My Orders ({orders.length})</Link>

        <Link to="/" className="btn btn-sm btn-outline border-violet-400 text-violet-600 hover:bg-violet-100">Back to Home</Link>
      </div>
    </div>
  </div>

{/* updated profile section */}
  <div className="mt-10 bg-white p-6 rounded-2xl shadow-md border border-violet-200">
    <h3 className="text-xl font-semibold mb-4 text-violet-700">Update Profile</h3>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      
      <input type="text" placeholder="Update Name" value={name} onChange={(e) => setName(e.target.value)} className="input input-bordered w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500"/>

      <input type="file" accept="image/*" onChange={handlePhotoChange} className="file-input file-input-bordered w-full rounded-xl  focus:outline-none focus:ring-2 focus:ring-violet-500"/>

    </div>

    <button onClick={handleUpdateProfile} className="btn w-full mt-5 bg-linear-to-r from-violet-600 to-purple-700 text-white rounded-xl">Save Changes</button>
  </div>

</div>


      <h2 className="text-3xl font-bold mt-4 mb-6 text-gray-800 text-center">Recent Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {orders.map(order => (
            <div key={order.id} className="bg-white rounded-xl border border-gray-200 p-4 shadow flex justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-lg bg-gray-100 flex-shrink-0">
                  <img src={order.image} alt={order.title} className="object-contain w-full h-full" />
                </div>
                <div>
                  <p className="font-semibold">{order.title}</p>
                  <p className="text-sm text-gray-500">{order.date}</p>
                </div>
              </div>
              <Link to={`/orders/${order.id}`} className="btn btn-outline btn-sm text-white rounded-lg px-3 bg-linear-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700">View</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
