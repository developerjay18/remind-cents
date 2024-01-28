import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Navbar } from '../../components';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    whatsappNumber: '',
    upiId: '',
    upiNumber: '',
  });

  const [profileFile, setProfileFile] = useState(null);
  const [QRCodeFile, setQRCodeFile] = useState(null);
  const navigate = useNavigate()

  const registerUser = async (userData) => {
    try {
      const response = await axios.post(
        'http://localhost:8000/api/v1/users/register',
        userData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.log('Error registering user from frontend', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = new FormData();
    for (const key in formData) {
      form.append(key, formData[key]);
    }

    form.append('profile', profileFile);
    form.append('QRCode', QRCodeFile);

    registerUser(form);

    // make all data fields empty after successfull submission
    setFormData({
      username: '',
      email: '',
      password: '',
      whatsappNumber: '',
      upiId: '',
      upiNumber: '',
    });
    setProfileFile(null);
    setQRCodeFile(null);
  };

  const handleChange = (e) => {
    const { name, files } = e.target;

    if (name === 'profile') {
      setProfileFile(files[0]);
    } else if (name === 'QRCode') {
      setQRCodeFile(files[0]);
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: e.target.value,
      }));
    }
  };

  return (
    <div className="gradient-bg lg:h-screen">
      {/* navbar  */}
      <Navbar />

      {/* signup form  */}
      <section>
        <div className="grid pt-16 lg:pt-0 grid-cols-1 lg:grid-cols-1 font-poppins">
          {/* left  */}
          <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-28 lg:py-32 lg:px-8">
            <div className="xl:mx-auto xl:w-full">
              <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
                Sign up
              </h2>
              <p className="mt-2 text-base text-gray-600">
                Already have an account?{' '}
                <Link
                  to={'/login'}
                  className="font-medium text-black transition-all duration-200 hover:underline"
                >
                  Login
                </Link>
              </p>
              <form
                method="post"
                className="mt-8 w-full"
                onSubmit={handleSubmit}
              >
                <div className="space-y-5 flex flex-wrap items-center justify-between w-full">
                  {/* user name  */}
                  <div className="w-full lg:w-[30%] mt-4">
                    <label
                      htmlFor="username"
                      className="text-base font-medium text-gray-900"
                    >
                      {' '}
                      User Name{' '}
                    </label>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="text"
                        placeholder="User Name"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                      ></input>
                    </div>
                  </div>

                  {/* email  */}
                  <div className="w-full lg:w-[30%]">
                    <label
                      htmlFor="email"
                      className="text-base font-medium text-gray-900"
                    >
                      {' '}
                      Email address{' '}
                    </label>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="email"
                        placeholder="Email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      ></input>
                    </div>
                  </div>

                  {/* password  */}
                  <div className="w-full lg:w-[30%]">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="text-base font-medium text-gray-900"
                      >
                        {' '}
                        Password{' '}
                      </label>
                    </div>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="password"
                        placeholder="Password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      ></input>
                    </div>
                  </div>

                  {/* whatsapp num  */}
                  <div className="w-full lg:w-[30%]">
                    <label
                      htmlFor="whatsappNumber"
                      className="text-base font-medium text-gray-900"
                    >
                      {' '}
                      WhatsApp Number{' '}
                    </label>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="text"
                        placeholder="WhatsApp Number"
                        id="whatsappNumber"
                        name="whatsappNumber"
                        value={formData.whatsappNumber}
                        onChange={handleChange}
                        required
                      ></input>
                    </div>
                  </div>

                  {/* upi id  */}
                  <div className="w-full lg:w-[30%]">
                    <label
                      htmlFor="upiId"
                      className="text-base font-medium text-gray-900"
                    >
                      {' '}
                      UPI Id{' '}
                    </label>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="text"
                        placeholder="UPI Id"
                        id="upiId"
                        name="upiId"
                        value={formData.upiId}
                        onChange={handleChange}
                        required
                      ></input>
                    </div>
                  </div>

                  {/* upi number  */}
                  <div className="w-full lg:w-[30%]">
                    <label
                      htmlFor="upiNumber"
                      className="text-base font-medium text-gray-900"
                    >
                      {' '}
                      UPI Number{' '}
                    </label>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="text"
                        placeholder="UPI Number"
                        id="upiNumber"
                        name="upiNumber"
                        value={formData.upiNumber}
                        onChange={handleChange}
                        required
                      ></input>
                    </div>
                  </div>

                  {/* profile pic  */}
                  <div className="w-full lg:w-[30%]">
                    <label
                      htmlFor="profile"
                      className="text-base font-medium text-gray-900"
                    >
                      {' '}
                      Profile Image{' '}
                    </label>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="file"
                        id="profile"
                        name="profile"
                        value={formData.profile}
                        onChange={handleChange}
                        required
                      ></input>
                    </div>
                  </div>

                  {/* QR code  */}
                  <div className="w-full lg:w-[30%]">
                    <label
                      htmlFor="QRCode"
                      className="text-base font-medium text-gray-900"
                    >
                      {' '}
                      QRCode{' '}
                    </label>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="file"
                        id="QRCode"
                        name="QRCode"
                        value={formData.QRCode}
                        onChange={handleChange}
                        required
                      ></input>
                    </div>
                  </div>

                  {/* submit button  */}
                  <div className="w-full lg:w-[30%] pt-6">
                    <button
                      type="submit"
                      className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2 font-semibold leading-7 text-white hover:bg-black/80"
                    >
                      Create Account <ArrowRight className="ml-2" size={16} />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
