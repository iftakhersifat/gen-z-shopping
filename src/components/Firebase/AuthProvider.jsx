import React, { createContext, useEffect, useState } from 'react';
import { 
  createUserWithEmailAndPassword, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  signOut, 
  updateProfile 
} from 'firebase/auth';
import { auth } from './Firebase';

export const AuthContext = createContext(null);
const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  // Load orders from localStorage safely
  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    const fixedOrders = savedOrders.map(o => ({
      id: o.id ? o.id.toString() : Date.now().toString(),
      title: o.title || 'Unknown',
      price: o.price || 0,
      image: o.image || 'https://via.placeholder.com/80',
      date: o.date || new Date().toLocaleString(),
      productId: o.productId ? o.productId.toString() : null,
    }));
    setOrders(fixedOrders);
    localStorage.setItem('orders', JSON.stringify(fixedOrders));
  }, []);

  // Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Register user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Login user
  const userLogin = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Login with Google
  const registerWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  // Logout
  const logOut = () => signOut(auth);

  // Update profile
  const updateUserProfile = profile => {
    if (!user) return;
    return updateProfile(user, profile)
      .then(() => setUser({ ...user, ...profile }))
      .catch(err => console.error(err));
  };

  // Add order
  const addOrder = order => {
    setOrders(prev => {
      const newOrder = { ...order, id: order.id.toString() };
      const updatedOrders = [...prev, newOrder];
      localStorage.setItem('orders', JSON.stringify(updatedOrders));
      return updatedOrders;
    });
  };
  // Add inside AuthProvider, below addOrder
const removeOrder = (orderId) => {
  setOrders(prev => {
    const updatedOrders = prev.filter(o => o.id !== orderId);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    return updatedOrders;
  });
};

  const authInfo = {
    user,
    loading,
    setLoading,
    orders,
    addOrder,
    removeOrder,
    createUser,
    userLogin,
    registerWithGoogle,
    logOut,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
