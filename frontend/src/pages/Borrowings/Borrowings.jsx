import React, { useEffect, useState } from 'react';
import { Navbar } from '../../components';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authenticationCheck } from '../../utils/checkTokenExpiry';
import { setAuth } from '../../store/authSlice';
import axios from 'axios';

function Borrowings() {
  const [userBorrowings, setuserBorrowings] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const resp = await authenticationCheck();

        dispatch(setAuth(resp));

        if (!resp) {
          navigate('/login');
        }

        const userBorrows = await axios.get('/api/v1/users/borrowed-data');
        setuserBorrowings(userBorrows.data.data);
      } catch (error) {
        console.error('Error checking authentication:', error);
      }
    };

    checkAuth();
  }, [dispatch, navigate, userBorrowings]);

  const deleteEntry = async (id) => {
    try {
      const response = await axios.delete(`/api/v1/borrowed/${id}`);
      console.log(response.data.data);
    } catch (error) {
      console.log('ERROR WHILE DELETING LENDED ENTRY ON FRONTEND', error);
    }
    console.log('entry deleting function started running');
  };

  return (
    <div className="font-poppins">
      <Navbar />

      {/* borrowings section  */}
      <div className="borrowing-container px-4 py-10 sm:px-6 sm:py-28 lg:py-32 lg:px-8">
        {/* heading  */}
        <div className="flex items-center gap-5">
          <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
            Borrowings
          </h2>
          <div className="w-[4%]">
            <Link to={'/borrowings/add'}>
              <button>
                <img
                  src="https://res.cloudinary.com/remind-cents-cloud/image/upload/v1706273770/q5aqac9bviccsgjb63u5.png"
                  alt=""
                />
              </button>
            </Link>
          </div>
        </div>

        {/* borrowings items  */}
        <div className="borrowing-items mt-10 flex flex-col gap-10">
          <section className="mx-auto w-full py-4">
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
              <div>
                <h2 className="text-lg font-semibold">All Borrowings</h2>
                <p className="mt-1 text-sm text-gray-700">
                  Total no. of borrowings: {userBorrowings.length}
                </p>
              </div>
              <div>
                <Link to={'/borrowings/add'}>
                  <button
                    type="button"
                    className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black capitalize"
                  >
                    Add new entry
                  </button>
                </Link>
              </div>
            </div>
            <div className="mt-6 flex flex-col">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                          >
                            <span>Name</span>
                          </th>
                          <th
                            scope="col"
                            className="px-16 py-3.5 text-left text-sm font-normal text-gray-700"
                          >
                            Amount
                          </th>

                          <th
                            scope="col"
                            className="px-12 py-3.5 text-left text-sm font-normal text-gray-700"
                          >
                            Duration
                          </th>

                          <th
                            scope="col"
                            className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                          >
                            Start date
                          </th>
                          <th
                            scope="col"
                            className="relative text-left font-normal px-1 py-3.5 text-gray-700"
                          >
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {userBorrowings.map((item, index) => (
                          <tr key={index}>
                            <td className="whitespace-nowrap px-4 py-4">
                              <div className="flex items-center">
                                <div className="">
                                  <div className="text-sm font-medium text-gray-900">
                                    {item.name}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-16 py-4">
                              <div className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold leading-5 text-green-800">
                                {item.amount} &#8377;
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-12 py-4">
                              <span className="text-sm text-gray-900">
                                {item.duration} Days
                              </span>
                            </td>
                            <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                              {item.startDate}
                            </td>
                            <td className="whitespace-nowrap px-1  py-4 text-right text-sm font-medium flex gap-5">
                              <Link
                                className="w-10"
                                to={`/borrowings/edit/${item._id}`}
                              >
                                <img
                                  src="https://res.cloudinary.com/remind-cents-cloud/image/upload/v1706273331/d6ucwm1iqpg8dheuh3sl.png"
                                  alt=""
                                />
                              </Link>
                              <Link
                                className="w-10"
                                to={`https://wa.me/${item.whatsappNumber}`}
                              >
                                <img
                                  src="https://res.cloudinary.com/remind-cents-cloud/image/upload/v1706273495/oulecib82nbib5dfxea1.png"
                                  alt=""
                                />
                              </Link>
                              <button
                                className="w-10"
                                onClick={() => deleteEntry(item._id)}
                              >
                                <img
                                  src="https://res.cloudinary.com/remind-cents-cloud/image/upload/v1706681596/cxsweghwncdfdtwddcdl.png"
                                  alt=""
                                />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Borrowings;
