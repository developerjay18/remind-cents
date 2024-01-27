import React from 'react';
import { Navbar } from '../../components';
import { ArrowRight } from 'lucide-react';

function Profile() {
  return (
    <div className="font-poppins gradient-bg h-screen">
      <Navbar />

      <section className="px-4 py-10 sm:px-6 sm:py-28 lg:py-32 lg:px-8 flex flex-col gap-5">
        {/* profile  */}
        <div className="profile-icon w-[20%]">
          <div className="flex items-center space-x-2">
            <img
              className="inline-block h-12 w-12 rounded-full object-cover"
              src="https://res.cloudinary.com/remind-cents-cloud/image/upload/v1706153488/hy0e5p5yimgazmrbnwdi.jpg"
              alt=""
            />
            <span className="flex flex-col">
              <span className="text-sm font-medium text-gray-900">
                Dan Abromov
              </span>
              <span className="text-sm font-medium text-gray-500">
                +91 6351-6666-9090
              </span>
            </span>
          </div>
        </div>

        <form action="" method="post" className="flex justify-between">
          {/* fields=1 */}
          <div className="fields w-[30%] flex flex-col gap-5">
            <div className="w-[80%]">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="email"
                id="email"
                value={'raijay2003@gmail.com'}
              ></input>
            </div>

            <div className="w-[80%]">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="password"
              >
                password
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="password"
                id="password"
                value={'Vadapav-kaho-'}
              ></input>
            </div>

            <div className="w-[80%]">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="whatsappNumber"
              >
                Whatsapp Number
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                id="whatsappNumber"
                value={'9099757285'}
              ></input>
            </div>
          </div>

          {/* fields=2 */}
          <div className="fields w-[30%] flex flex-col gap-5">
            <div className="w-[80%]">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="upiId"
              >
                UPI ID
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                id="upiId"
                name="upiId"
                value={'raijay2003@okhdfcbank'}
              ></input>
            </div>

            <div className="w-[80%]">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="upiNumber"
              >
                UPI Number
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="upiNumber"
                id="upiNumber"
                value={'8976898900'}
              ></input>
            </div>

            <div className="w-[80%] pt-6">
              <button
                type="button"
                className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2 font-semibold leading-7 text-white hover:bg-black/80"
              >
                Delete Account <ArrowRight className="ml-2" size={16} />
              </button>
            </div>
          </div>

          {/* fields=3 */}
          <div className="fields w-[30%] flex flex-col gap-5">
            {/* profile pic  */}
            <div className="w-[80%]">
              <label
                htmlFor="profile"
                className="text-base font-medium text-gray-900"
              >
                {' '}
                New Profile Image{' '}
              </label>
              <div className="">
                <input
                  className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="file"
                  id="profile"
                  name="profile"
                ></input>
              </div>
            </div>

            {/* QR code  */}
            <div className="w-[80%]">
              <label
                htmlFor="QRCode"
                className="text-base font-medium text-gray-900"
              >
                {' '}
                New QRCode{' '}
              </label>
              <div className="">
                <input
                  className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="file"
                  id="QRCode"
                  name="QRCode"
                ></input>
              </div>
            </div>

            <div className="w-[80%] pt-6">
              <button
                type="button"
                className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2 font-semibold leading-7 text-white hover:bg-black/80"
              >
                Update Profile <ArrowRight className="ml-2" size={16} />
              </button>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Profile;
