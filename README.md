# Gen-Z Shopping 🛒

**Gen-Z Shopping** is a modern, responsive e-commerce platform built with **React**, **TailwindCSS**, and **Firebase**. It allows users to browse trending products, view details, manage orders, and authenticate via Email/Password, Google, or GitHub.

---

## 🚀 Features

### User Interface

- Fully **responsive design** (mobile & desktop)
- Clean and modern UI using **TailwindCSS** and **DaisyUI**
- Reusable components: `Navbar`, `Footer`, `ProductCard`, `OrderCard`, etc.
- Use of **React Hooks**: `useState`, `useEffect`, `useContext`

### Routing

- Implemented with **React Router**
- **Dynamic Routes** for product details and orders
- Protected **Dashboard** route (Private Route)
- 404 Not Found page
- URL-based navigation with parameters

### Product & Order Pages

- Browse trending products on **Home**
- **Dynamic Product Details Page** with image, title, price, description
- **Orders Page** showing all user orders
- Cancel or view details of orders dynamically

### Authentication (Firebase)

- **Email & Password Authentication**: Register, Login, Logout
- **Google Authentication**
- **GitHub Authentication**
- Store user info in **React Context**
- Display user profile after login (Name, Email, Photo)

### Authorization & Security

- Only logged-in users can access protected routes
- Redirect unauthenticated users to **Login** page
- Maintain authentication state across pages with Firebase

---

## 🛠 Tech Stack

| Feature        | Technology                                |
| -------------- | ----------------------------------------- |
| Frontend       | React, TailwindCSS, DaisyUI               |
| Routing        | React Router                              |
| Authentication | Firebase (Email/Password, Google, GitHub) |
| Notifications  | react-hot-toast                           |
| Icons          | react-icons                               |

---

## 🌐 Live Demo

**Gen-Z Shopping** here: [https://gen-z-shopping.netlify.app](https://gen-z-shopping.netlify.app)
