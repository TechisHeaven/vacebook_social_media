import React from 'react'

const FriendsContainer = () => {
    let Images = [
        {
          FriendId: 1,
          FriendUrl: "https://random.imagecdn.app/500/150",
          FriendName: "Nishu Verma"
        },
        {
          FriendId: 2,
          FriendUrl: "https://random.imagecdn.app/500/150",
          FriendName: "Priyanshu Verma"
        },
        {
            FriendId: 3,
            FriendUrl: "https://random.imagecdn.app/500/150",
          FriendName: "Nishu Verma"
        },
        {
            FriendId: 4,
            FriendUrl: "https://random.imagecdn.app/500/150",
          FriendName: "Nishu Verma"
        },
        {
            FriendId: 5,
            FriendUrl: "https://random.imagecdn.app/500/150",
          FriendName: "Nishu Verma"
        },
        {
            FriendId: 6,
            FriendUrl: "https://random.imagecdn.app/500/150",
          FriendName: "Nishu Verma"
        },
        {
            FriendId: 7,
            FriendUrl: "/profile.jpg",
          FriendName: "Nishu Verma"
        },
        {
            FriendId: 8,
            FriendUrl: "https://random.imagecdn.app/500/150",
          FriendName: "Nishu Verma"
        },
        {
            FriendId: 9,
            FriendUrl: "https://random.imagecdn.app/500/150",
          FriendName: "Nishu Verma"
        },
      ];


  return (
    <>
      <div className="wrapper w-[490px] bg-white rounded-lg  sticky -top-10">
        <div className="flex flex-row w-full justify-between p-4 pb-0">
            <div>
          <h1 className="text-xl font-bold">Friends</h1>
          <p>480 friends</p>
            </div>
          <a
            href="#"
            className="hover:bg-gray-200 transition-all duration-200 p-2 h-10"
            style={{ color: "hsl(214, 89%, 52%)" }}
          >
            See All Friends
          </a>
        </div>
        <div className="grid grid-cols-3 grid-rows-3 gap-2 p-4">
          {Images.map((value) => {
            return (
              <div className="w-full" key={value.FriendId}>
                <img
                  className=" w-full aspect-square rounded-lg object-cover"
                  src={value.FriendUrl}
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
