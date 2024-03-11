import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Navbar } from '../../components';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { setAuth } from '../../store/authSlice';
import { useDispatch } from 'react-redux';

export default function EditLending() {
  const [entryData, setEntryData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    const fetchEntry = async (id) => {
      try {
        const entryId = id;
        const response = await axios.get(`/api/v1/lended/${entryId}`);
        setEntryData(response.data.data);
      } catch (error) {
        console.log('ERROR WHILE FETCHING EDIT ENTRY DATA ON FRONTEND', error);
      }
    };

    fetchEntry(id);
  }, [id]);

  const editEntry = async (id) => {
    try {
      const response = await axios.patch(`/api/v1/lended/${id}`, entryData);
      console.log(response.data.data);
    } catch (error) {
      console.log('ERROR WHILE EDITING ENTRY ON FRONTEND', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEntryData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editEntry(entryData._id);

    setEntryData({});
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
                Edit Entry
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
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="text"
                        placeholder="saved name"
                        id="name"
                        name="name"
                        value={entryData.name}
                        onChange={handleChange}
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
                        value={entryData.amount}
                        onChange={handleChange}
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
                        value={entryData.duration}
                        onChange={handleChange}
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
                        value={entryData.whatsappNumber}
                        onChange={handleChange}
                      ></input>
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                    >
                      Save <ArrowRight className="ml-2" size={16} />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="h-full w-full">
            <img
              className="mx-auto h-full w-full rounded-md object-cover"
              src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80"
              alt=""
            />
          </div>
        </div>
      </section>
    </div>
  );
}
