import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Root from './components/pages/Root.jsx';
import Home from './components/pages/Home.jsx';
import Login from './components/pages/Login.jsx';
import Register from './components/pages/Register.jsx';
import { Toaster } from 'react-hot-toast';
import AuthProvider from './components/Firebase/AuthProvider.jsx';
import NotFound from './components/pages/NotFound.jsx';
import Details from './components/pages/Details.jsx';
import Private from './components/Firebase/Private.jsx';
import Dashboard from './components/pages/Dashboard.jsx';
import Orders from './components/pages/Orders.jsx';
import OrderDetails from './components/pages/OrderDetails.jsx';
import MyOrderList from './components/pages/MyOrderList.jsx';

const router = createBrowserRouter([
  {
    path:'/',
    Component: Root,
    children:[
      {index: true, Component:Home},
      {path:'/login', Component: Login},
      {path:'/register', Component: Register},
      {path:'/products/:id', Component: Details},
      {path:'/orders/new', element:<Private><Orders></Orders></Private>},
      {path:'/orders/:id', element:<Private><OrderDetails></OrderDetails></Private>},
      {path:'/dashboard', element:<Private><Dashboard></Dashboard></Private>},
      {path:'/orderList', element:<Private><MyOrderList></MyOrderList></Private>},
    ]
  },
  {
    path: "*", Component: NotFound
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <Toaster position="top-right" reverseOrder={false} />
    <RouterProvider router={router} />,
    </AuthProvider>
    
  </StrictMode>,
)
