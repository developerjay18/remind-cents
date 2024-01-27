import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import {
  AddBorrowing,
  AddLending,
  Borrowings,
  EditBorrowing,
  EditLending,
  Home,
  Lendings,
  Login,
  Profile,
  Signup,
} from './pages/index.js';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Home />} />
      <Route path="/sign-up" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/lendings" element={<Lendings />} />
      <Route path="/lendings/add" element={<AddLending />} />
      <Route path="/lendings/edit" element={<EditLending />} />
      <Route path="/borrowings" element={<Borrowings />} />
      <Route path="/borrowings/add" element={<AddBorrowing />} />
      <Route path="/borrowings/edit" element={<EditBorrowing />} />
      <Route path="/profile" element={<Profile />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </React.StrictMode>
);
