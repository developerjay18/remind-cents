import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Navbar } from '../../components';

export default function ResetPassword() {
  return (
    <div className="gradient-bg">
      <Navbar />

      <section className="pt-10">
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24 font-poppins">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <div className="mb-2 flex justify-center w-[20%] mx-auto">
              <img
                src="https://res.cloudinary.com/remind-cents-cloud/image/upload/v1706201890/gwipyrsrmyqy41kiqnkq.png"
                alt=""
              />
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight text-black">
              Change Your Password
            </h2>
            <form action="#" method="POST" className="mt-8">
              <div className="space-y-5">
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="oldPassword"
                      className="text-base font-medium text-gray-900"
                    >
                      {' '}
                      Old Password{' '}
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="password"
                      placeholder="Old Password"
                      name="oldPassword"
                      id="oldPassword"
                    ></input>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="newPassword"
                      className="text-base font-medium text-gray-900"
                    >
                      {' '}
                      New Password{' '}
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="password"
                      placeholder="New Password"
                      name="newPassword"
                      id="newPassword"
                    ></input>
                  </div>
                </div>
                <div>
                  <button
                    type="button"
                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                  >
                    Change Password <ArrowRight className="ml-2" size={16} />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
