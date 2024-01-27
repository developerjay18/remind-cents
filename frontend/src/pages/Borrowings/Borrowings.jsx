import React from 'react';
import { Navbar } from '../../components';
import { Link } from 'react-router-dom';

function Borrowings() {
  return (
    <div className="font-poppins">
      <Navbar />

      {/* borrowing section  */}
      <div className="lending-container px-4 py-10 sm:px-6 sm:py-28 lg:py-32 lg:px-8">
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
        <div className="lending-items mt-10 flex flex-col gap-10">
          <div className="infos">Total No. of borrowings : 1224</div>
          <div className="item border pt-8 px-5 rounded-md flex-col">
            <div className="upper flex items-center justify-between">
              <div className="name flex w-[20%] flex-col gap-6 ">
                <div className="text-md font-semibold text-gray-800 text-center">
                  Name of the person
                </div>
                <div className="text-xl border flex gap-2 justify-center border-black rounded-md px-3 py-2">
                  <span>500000</span>
                  <span>&#8377;</span>
                </div>
              </div>
              <div className="duration w-[20%] flex flex-col gap-6">
                <div className="text-md font-semibold text-gray-800 text-center">
                  Duration (Days)
                </div>
                <div className="text-2xl font-bold flex gap-2 justify-center rounded-md px-3 py-1">
                  10
                </div>
              </div>
              <div className="actions w-[20%] flex items-center gap-4 justify-end">
                <div className="w-[19%]">
                  <Link to={'/borrowings/edit'}>
                    <button>
                      <img
                        src="https://res.cloudinary.com/remind-cents-cloud/image/upload/v1706273331/d6ucwm1iqpg8dheuh3sl.png"
                        alt=""
                      />
                    </button>
                  </Link>
                </div>
                <div className="w-[20%]">
                  <Link to={'/redirect-to-whatsapp'}>
                    <button>
                      <img
                        src="https://res.cloudinary.com/remind-cents-cloud/image/upload/v1706273495/oulecib82nbib5dfxea1.png"
                        alt=""
                      />
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="lower pt-5 text-right">
              Start Date : 22nd January, 2024
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Borrowings;
