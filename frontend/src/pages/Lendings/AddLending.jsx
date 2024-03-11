import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Navbar } from '../../components';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuth } from '../../store/authSlice';
import { authenticationCheck } from '../../utils/checkTokenExpiry';
import axios from 'axios';

export default function AddLending() {
  const [entry, setEntry] = useState({
    name: '',
    amount: '',
    duration: '',
    whatsappNumber: '',
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const resp = await authenticationCheck();
        console.log('Authentication response:', resp);

        dispatch(setAuth(resp));

        if (!resp) {
          navigate('/login');
        }
        // const storedRefreshToken = localStorage.getItem('refreshToken');
        // console.log(storedRefreshToken);
        // const response = await axios.post('/api/v1/users/refresh-token', {
        //   refreshToken: storedRefreshToken,
        // });
        // console.log(response);
      } catch (error) {
        console.error('Error checking authentication:', error);
      }
    };

    checkAuth();
  }, [dispatch, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEntry((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const addEntry = async (data) => {
    try {
      const response = await axios.post('/api/v1/lended/add-entry', data);
      console.log(response.data.data);
    } catch (error) {
      console.log('ERROR ON ADDING ENTRY FROM FRONT-END', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addEntry(entry);

    setEntry({
      name: '',
      amount: '',
      duration: '',
      whatsappNumber: '',
    });

    dispatch(setAuth(true));
    navigate('/lendings');
  };

  return (
    <div className="font-poppins h-screen overflow-hidden">
      <Navbar />

      <section className="">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-32">
            <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
              <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
                Add Entry
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
                      Name{' '}
                    </label>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 capitalize"
                        type="text"
                        placeholder="saved name"
                        id="name"
                        name="name"
                        onChange={handleChange}
                        value={entry.name}
                      ></input>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="amount"
                      className="text-base font-medium text-gray-900"
                    >
                      {' '}
                      Amount (&#8377;){' '}
                    </label>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="text"
                        placeholder="amount"
                        id="amount"
                        name="amount"
                        onChange={handleChange}
                        value={entry.amount}
                      ></input>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="duration"
                        className="text-base font-medium text-gray-900"
                      >
                        {' '}
                        Duration (Days){' '}
                      </label>
                    </div>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="text"
                        placeholder="duration"
                        id="duration"
                        name="duration"
                        onChange={handleChange}
                        value={entry.duration}
                      ></input>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="whatsappNumber"
                        className="text-base font-medium text-gray-900"
                      >
                        {' '}
                        Whatsapp Number{' '}
                      </label>
                    </div>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="text"
                        placeholder="Whatsapp Number"
                        id="whatsappNumber"
                        name="whatsappNumber"
                        onChange={handleChange}
                        value={entry.whatsappNumber}
                      ></input>
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                    >
                      Add <ArrowRight className="ml-2" size={16} />
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
