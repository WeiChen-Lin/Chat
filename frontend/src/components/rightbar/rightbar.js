import { useState } from 'react';
import Members from 'Components/rightbar/members/members';
import Settings from 'Components/rightbar/setting/setting';
import Notification from 'Components/rightbar/notification/notification';

const _active = 'text-blue-600 border-blue-600 active dark:text-blue-500 dark:border-blue-500';
const _deactive =
  'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300';

export default function Rightbar(props) {
  const [barStatus, setBarStatus] = useState('users');
  const { membersIsLoading, onlineMember } = props;
  return (
    <div className="border-gray-300 lg:col-span-1 lg:block h-screen">
      <div className="w-full flex flex-col h-full justify-between">
        <div className="border-b border-gray-200 dark:border-gray-700 cursor-pointer">
          <ul className="flex text-sm font-medium text-center text-gray-500 dark:text-gray-400">
            <li
              className={`w-1/2 rounded-t-lg border-b-2 ${
                barStatus === 'users' ? _active : _deactive
              }`}
              onClick={() => {
                setBarStatus('users');
              }}
            >
              <a className="inline-flex p-4 group" aria-current="page">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2 w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </a>
            </li>
            <li
              className={`w-1/2 rounded-t-lg border-b-2 ${
                barStatus === 'notification' ? _active : _deactive
              }`}
              onClick={() => {
                setBarStatus('notification');
              }}
            >
              <a className="inline-flex p-4 group">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2 w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </a>
            </li>
            <li
              className={`w-1/2 rounded-t-lg border-b-2 ${
                barStatus === 'settings' ? _active : _deactive
              }`}
              onClick={() => {
                setBarStatus('settings');
              }}
            >
              <a className="inline-flex p-4 group">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2 w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </a>
            </li>
          </ul>
        </div>
        <Members
          barStatus={barStatus}
          membersIsLoading={membersIsLoading}
          onlineMember={onlineMember}
        />
        <Settings barStatus={barStatus} />
        <Notification barStatus={barStatus} />
      </div>
    </div>
  );
}
