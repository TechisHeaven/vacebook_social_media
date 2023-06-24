import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { Avatar } from '@mui/material';
import { useStateContext } from '../../state';


const Sidebar = () => {
  const state = useStateContext();
  const { user } = state.user;
  let userId = JSON.parse(localStorage.getItem("user"))
  userId = user._id;

  return (
    <div className='h-full sticky top-[80px] bg-[#F0F2F5] z-10  max-lg:hidden'>
      <div className="sidebarWrapper px-2 flex flex-col">
        <Link to={`/profile/${userId}`}>
        <div className="items flex w-[344px] max-2xl:w-[244px] h-[50px] px-2 p-2 rounded-lg hover:bg-gray-200 transition-all cursor-pointer">
            <div className="itemWrapper flex flex-row justify-start gap-2 items-center">
                <Avatar src={'http://localhost:3000/public/user/images/'+user.pic} className='rounded-full w-[35px]' alt="profile image" />
                <h1 className='text-base font-medium'>{user.name}</h1>
            </div>
        </div>
        </Link>
        
        <Link to="/friends">
        <div className="items flex w-[344px] max-2xl:w-[244px]  h-[50px] px-2 p-2 rounded-lg hover:bg-gray-200 transition-all cursor-pointer">
            <div className="itemWrapper flex flex-row justify-start gap-2 items-center">
                <div className='overflow-hidden h-[40px]'>
                <img src='/icons.png' className='translate-y-[-295px]' />
                </div>
                <h1 className='text-base font-medium'>Friends</h1>
            </div>
        </div>
        </Link>
        <Link to="/">
        <div className="items flex w-[344px] max-2xl:w-[244px] h-[50px] px-2 p-2 rounded-lg hover:bg-gray-200 transition-all cursor-pointer">
            <div className="itemWrapper flex flex-row justify-start gap-2 items-center">
            <div className='overflow-hidden h-[40px]'>
                <img src='/icons.png' className='translate-y-[-185px]' />
                </div>
                <h1 className='text-base font-medium'>Saved</h1>
            </div>
        </div>
        </Link>
        <Link to="/">
        <div className="items flex w-[344px] max-2xl:w-[244px] h-[50px] px-2 p-2 rounded-lg hover:bg-gray-200 transition-all cursor-pointer">
            <div className="itemWrapper flex flex-row justify-start gap-2 items-center">
            <div className='overflow-hidden h-[40px]'>
                <img src='/icons.png' className='translate-y-[-70px]' />
                </div>
                <h1 className='text-base font-medium'>Group</h1>
            </div>
        </div>
        </Link>
        
      </div>
    </div>
  )
}

export default Sidebar
