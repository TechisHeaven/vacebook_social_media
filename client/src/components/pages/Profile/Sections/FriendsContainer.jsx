import React from 'react'
import { Link } from 'react-router-dom';

const FriendsContainer = ({user}) => {


  return (
    <>
      <div className="wrapper w-[490px] bg-white rounded-lg  sticky -top-10">
        <div className="flex flex-row w-full justify-between p-4 pb-0">
            <div>
          <h1 className="text-xl font-bold">Friends</h1>
          <p>{user?.friends.length} friends</p>
            </div>
          <Link
            to={'/friends'}
            className="hover:bg-gray-200 transition-all duration-200 p-2 h-10"
            style={{ color: "hsl(214, 89%, 52%)" }}
          >
            See All Friends
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-2 p-4">
          {user?.friends.map((value) => {
            return (
              <div className="w-full" key={value.user_id}>
                <img
                  className=" w-full aspect-square rounded-lg object-cover"
                  src={'http://localhost:3000/public/user/images/'+ value.user_pic}
                  alt="Photos"
                />
                <p className='text-sm font-semibold'>{value.FriendName}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  )
}

export default FriendsContainer
