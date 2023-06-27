import React from "react";

const PhotosContainer = ({posts}) => {

  
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
          {posts.map((value) => {
            return (
              <div className="w-full" key={value._id}>
                <img
                  className=" w-full aspect-square object-cover"
                  src={'http://localhost:3000/public/images/'+value.postImg}
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
