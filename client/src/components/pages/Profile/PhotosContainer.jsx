import React from "react";

const PhotosContainer = () => {
  let Images = [
    {
      ImageId: 1,
      ImageUrl: "https://random.imagecdn.app/500/150",
    },
    {
      ImageId: 2,
      ImageUrl: "https://random.imagecdn.app/500/150",
    },
    {
      ImageId: 3,
      ImageUrl: "https://random.imagecdn.app/500/150",
    },
    {
      ImageId: 4,
      ImageUrl: "https://random.imagecdn.app/500/150",
    },
    {
      ImageId: 5,
      ImageUrl: "https://random.imagecdn.app/500/150",
    },
    {
      ImageId: 6,
      ImageUrl: "https://random.imagecdn.app/500/150",
    },
    {
      ImageId: 7,
      ImageUrl: "/profile.jpg",
    },
    {
      ImageId: 8,
      ImageUrl: "https://random.imagecdn.app/500/150",
    },
    {
      ImageId: 9,
      ImageUrl: "https://random.imagecdn.app/500/150",
    },
  ];


  return (
    <>
      <div className="wrapper w-[490px] bg-white rounded-lg">
        <div className="flex flex-row w-full justify-between p-4 pb-0">
          <h1 className="text-xl font-bold">Photos</h1>
          <a
            href="#"
            className="hover:bg-gray-200 transition-all duration-200 p-2"
            style={{ color: "hsl(214, 89%, 52%)" }}
          >
            See All Photos
          </a>
        </div>
        <div className="grid grid-cols-3 grid-rows-3 gap-1 p-4">
          {Images.map((value) => {
            return (
              <div className="w-full" key={value.ImageId}>
                <img
                  className=" w-full aspect-square object-cover"
                  src={value.ImageUrl}
                  alt="Photos"
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default PhotosContainer;
