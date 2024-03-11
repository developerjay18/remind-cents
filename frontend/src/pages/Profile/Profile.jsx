import React, { useEffect, useState } from 'react';
import { Navbar } from '../../components';
import { ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authenticationCheck } from '../../utils/checkTokenExpiry';
import { setAuth } from '../../store/authSlice';
import axios from 'axios';
function Profile() {
  const [user, setUser] = useState({});

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

        const userData = await axios.get('/api/v1/users/current-user');
        setUser(userData.data.data);
      } catch (error) {
        console.error('Error checking authentication:', error);
      }
    };

    checkAuth();
  }, [dispatch, navigate]);

  const userDetails = [
    {
      title: 'Username',
      value: user.username,
    },
    {
      title: 'Email',
      value: user.email,
    },
    {
      title: 'whatsapp number',
      value: `+91 ${user.whatsappNumber}`,
    },
    {
      title: 'upi ID',
      value: user.upiId,
    },
    {
      title: 'upi number',
      value: user.upiNumber,
    },
  ];

  return (
    <div className="font-poppins gradient-bg max-h-screen overflow-hidden">
      <Navbar />

      <div className="px-4 py-10 sm:px-6 sm:py-28 lg:py-32 lg:px-8">
        {/* profile  */}
        <div className="profile-icon w-[20%]">
          <div className="flex items-center space-x-2">
            <img
              className="inline-block h-12 w-12 rounded-full object-cover"
              src={user.profile}
              alt=""
            />
            <span className="flex flex-col">
              <span className="text-sm font-medium text-gray-900">
                {user.username}
              </span>
              <span className="text-sm font-medium text-gray-500">
                +91 {user.whatsappNumber}
              </span>
            </span>
          </div>
        </div>

        {/* remaining section  */}
        <section className="mx-auto w-full py-4 my-5 flex flex-col gap-5">
          <div className="profile-infos bg-white rounded-md flex flex-col gap-3 p-5">
            {userDetails?.map((item, index) => (
              <div
                className="info flex gap-3 border-b border-gray-300 pb-1"
                key={index}
              >
                <span className="capitalize w-[20%]">{item.title}:</span>
                <span className="text-gray-700">{item.value}</span>
              </div>
            ))}
          </div>

          <div className="actions flex justify-between">
            <div className="">
              <Link to={'/update-account'}>
                <button
                  type="button"
                  className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black capitalize"
                >
                  update account details
                </button>
              </Link>
            </div>

            <div className="">
              <Link to={'/reset-password'}>
                <button
                  type="button"
                  className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black capitalize"
                >
                  change password
                </button>
              </Link>
            </div>

          </div>
        </section>
      </div>
    </div>
  );
}

export default Profile;
