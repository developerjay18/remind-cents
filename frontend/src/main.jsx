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
  ResetPassword,
  Signup,
  UpdateAccount,
} from './pages/index.js';

import { Provider } from 'react-redux';
import store from './store/store.js';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Home />} />
      <Route path="/sign-up" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      <Route path="/lendings" element={<Lendings />} />
      <Route path="/lendings/add" element={<AddLending />} />
      <Route path="/lendings/edit/:id" element={<EditLending />} />

      <Route path="/borrowings" element={<Borrowings />} />
      <Route path="/borrowings/add" element={<AddBorrowing />} />
      <Route path="/borrowings/edit/:id" element={<EditBorrowing />} />

      <Route path="/profile" element={<Profile />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/update-account" element={<UpdateAccount />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
