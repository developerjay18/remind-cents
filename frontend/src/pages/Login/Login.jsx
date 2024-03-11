import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Navbar } from '../../components';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setAuth } from '../../store/authSlice';

export default function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.isAuthenticated);

  const loginUser = async (userData) => {
    try {
      const response = await axios.post('/api/v1/users/login', userData);

      console.log(response);
      if (response.data) {
        localStorage.setItem('accessToken', response.data.data.accessToken);
        localStorage.setItem('refreshToken', response.data.data.refreshToken);
      }
    } catch (error) {
      console.log('ERROR OCCURED VIA LOGIN FROM FRONTEND', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginUser(formData);
    setFormData({
      username: '',
      password: '',
    });

    await dispatch(setAuth(true));
    navigate('/');
  };

  return (
    <div className="gradient-bg">
      {/* navbar  */}
      <Navbar />

      {/* login section  */}
      <section>
        <div className=" pt-16 lg:pt-0 grid grid-cols-1 lg:grid-cols-2 font-poppins">
          <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
            <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
              <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
                Login
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Don&apos;t have an account?{' '}
                <Link
                  to={'/sign-up'}
                  className="font-semibold text-black transition-all duration-200 hover:underline"
                >
                  Create a free account
                </Link>
              </p>
              <form
                action="#"
                method="POST"
                className="mt-8"
                onSubmit={handleSubmit}
              >
                <div className="space-y-5">
                  <div>
                    <label
                      htmlFor="username"
                      className="text-base font-medium text-gray-900"
                    >
                      {' '}
                      Username{' '}
                    </label>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="text"
                        placeholder="Username"
                        name="username"
                        id="username"
                        onChange={handleChange}
                        value={formData.username}
                        required
                      ></input>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="text-base font-medium text-gray-900"
                      >
                        {' '}
                        Password{' '}
                      </label>
                      <Link
                        to={'/reset-password'}
                        className="text-sm font-semibold text-black hover:underline"
                      >
                        {' '}
                        Forgot password?{' '}
                      </Link>
                    </div>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="password"
                        placeholder="Password"
                        id="password"
                        name="password"
                        onChange={handleChange}
                        value={formData.password}
                        required
                      ></input>
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                    >
                      Get started <ArrowRight className="ml-2" size={16} />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="h-screen w-full ">
            <img
              className="mx-auto h-full w-full rounded-md object-cover"
              src="https://images.unsplash.com/photo-1630673245362-f69d2b93880e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
              alt=""
            />
          </div>
        </div>
      </section>
    </div>
  );
}
