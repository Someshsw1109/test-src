import React from 'react';
import { useSelector } from 'react-redux';
import { deleteAccount } from '../../../services/operations/profileAPI';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Layout from '../../../components/layout/Layout';

const Settings = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.profile.user);

  const onDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      deleteAccount(token, dispatch, navigate);
    }
  };

  return (
    <Layout>
      <div className="flex-1 overflow-auto text-white">
        <div className="mx-auto w-11/12 max-w-[1000px] py-10">
          <div className="my-10 flex flex-row gap-x-5 rounded-md border-[1px] border-pink-600 bg-pink-600 p-3 md:p-8 md:px-12">
            <div className="flex aspect-square h-14 w-14 items-center justify-center rounded-full bg-pink-700">
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-3xl text-white"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
              </svg>
            </div>
            <div className="flex flex-col space-y-2 w-full">
              <h2 className="text-lg font-semibold text-white">Delete Account</h2>
              <div className="md:w-3/5 text-white">
                <p>Would you like to delete your account?</p>
                <p>
                  This account may contain your items. Deleting your account is
                  permanent and will remove all the content associated with it.
                </p>
              </div>
              <button
                type="button"
                onClick={onDeleteAccount}
                className="w-fit cursor-pointer italic text-black"
              >
                I want to delete my account.
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;