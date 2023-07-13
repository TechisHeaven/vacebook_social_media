import React from 'react'
import { Link } from 'react-router-dom'
import { Avatar } from '@mui/material';
import { formatTime } from '../../functions/formatDate';

const NotificationLayout = ({value}) => {

  console.log(formatTime(Date.now()))
  return (
    <>
      <div className="sidebarWrapper px-2 flex flex-col">
        <div to="/profile">
          <div className="items flex w-[344px]  h-[60px] px-2 p-2 rounded-lg hover:bg-gray-200 transition-all cursor-pointer">
            <div className="itemWrapper flex flex-row justify-start gap-2 items-center">
              <div className="relative">
                <Avatar
                  src={import.meta.env.VITE_PUBLIC_USER_IMAGE_FOLDER+value.pic}
                  className="rounded-full w-[50px]"
                  alt="profile image"
                />
              </div>
              <div>
              <h1 className="text-base font-medium"><span className='font-bold'>{value.name}</span> Notification</h1>
              <p className='text-[#1B74E4]'>a week ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default NotificationLayout
