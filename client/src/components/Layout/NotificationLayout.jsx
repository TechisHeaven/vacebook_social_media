import React from 'react'
import { Link } from 'react-router-dom'
import { Avatar } from '@mui/material';

const NotificationLayout = () => {
  return (
    <>
      <div className="sidebarWrapper px-2 flex flex-col">
        <Link to="/profile">
          <div className="items flex w-[344px]  h-[60px] px-2 p-2 rounded-lg hover:bg-gray-200 transition-all cursor-pointer">
            <div className="itemWrapper flex flex-row justify-start gap-2 items-center">
              <div className="relative">
                <Avatar
                  src="profile.jpg"
                  className="rounded-full w-[50px]"
                  alt="profile image"
                />
              </div>
              <div>
              <h1 className="text-base font-medium"><span className='font-bold'>Elon Musk</span> added a new photo</h1>
              <p className='text-[#1B74E4]'>a week ago</p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  )
}

export default NotificationLayout
