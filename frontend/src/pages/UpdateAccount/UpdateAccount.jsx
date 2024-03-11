import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Navbar } from '../../components';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuth } from '../../store/authSlice';
import { authenticationCheck } from '../../utils/checkTokenExpiry';
import axios from 'axios';

function UpdateAccount() {
  const [profileData, setprofileData] = useState({
    email: '',
    whatsappNumber: '',
    upiId: '',
    upiNumber: '',
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const response = await axios.get('/api/v1/users/current-user');
        const { email, whatsappNumber, upiId, upiNumber } = response.data.data;
        setprofileData({
          email: email,
          whatsappNumber: whatsappNumber,
          upiId: upiId,
          upiNumber: upiNumber,
        });
      } catch (error) {
        console.log('ERROR WHILE FETCHING USER ON PROFILE UPDATE', error);
      }
    };

    fetchEntry();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setprofileData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const updateAccountF = async () => {
    try {
      const response = await axios.patch(
        '/api/v1/users/update-account',
        profileData
      );

      console.log(response.data.data);
    } catch (error) {
      console.log('ERROR WHILE UPDATING ACCOUNT', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    updateAccountF();
    setprofileData({
      email: '',
      whatsappNumber: '',
      upiId: '',
      upiNumber: '',
    });
    dispatch(setAuth(true));
    navigate('/profile');
  };

  return (
    <div className="font-poppins h-screen overflow-hidden">
      <Navbar />

      <section className="">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-32">
            <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
              <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
                Update Profile
              </h2>
              <form
                action="#"
                method="POST"
                className="mt-8"
                onSubmit={handleSubmit}
              >
                <div className="space-y-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="text-base font-medium text-gray-900"
                    >
                      {' '}
                      Email{' '}
                    </label>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="email"
                        id="email"
                        name="email"
                        required
                        onChange={handleChange}
                        value={profileData.email}
                      ></input>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="amount"
                      className="text-base font-medium text-gray-900"
                    >
                      {' '}
                      Whatsapp Number{' '}
                    </label>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="tel"
                        id="whatsappNumber"
                        name="whatsappNumber"
                        onChange={handleChange}
                        value={profileData.whatsappNumber}
                      ></input>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="upiId"
                        className="text-base font-medium text-gray-900"
                      >
                        {' '}
                        UPI ID{' '}
                      </label>
                    </div>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="text"
                        id="upiId"
                        name="upiId"
                        onChange={handleChange}
                        value={profileData.upiId}
                      ></input>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="upiNumber"
                        className="text-base font-medium text-gray-900"
                      >
                        {' '}
                        UPI Number{' '}
                      </label>
                    </div>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="text"
                        id="upiNumber"
                        name="upiNumber"
                        onChange={handleChange}
                        value={profileData.upiNumber}
                      ></input>
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                    >
                      Update Profile <ArrowRight className="ml-2" size={16} />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="h-full w-full">
            <img
              className="mx-auto h-full w-full rounded-md object-cover"
              src="https://res.cloudinary.com/remind-cents-cloud/image/upload/v1706279825/jjhq5oc6nykxaeee0ni1.jpg"
              alt=""
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default UpdateAccount;
