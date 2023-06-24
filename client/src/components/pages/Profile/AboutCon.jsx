import React, { useState } from "react";
import BasicInfo from "./Sections/BasicInfo";

const AboutCon = () => {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <>
      <div className="wrapper justify-center flex flex-row rounded-md w-[1218px] gap-1 rounded-md">
        <div className="p-2 w-[287px] bg-white">
          <h1 className="p-2 text-xl font-bold">About</h1>
          <div>
            <ul className="gap-2 flex flex-col">
              <li
                className={
                  activeTab == 1
                    ? "bg-blue-200 p-2 rounded-md cursor-pointer text-blue-500 font-semibold transition-all"
                    : "hover:bg-gray-300 p-2 rounded-md cursor-pointer font-semibold transition-all"
                }
                onClick={() => setActiveTab(1)}
              >
                Overview
              </li>
              <li
                className={
                  activeTab == 2
                  ? "bg-blue-200 p-2 rounded-md cursor-pointer text-blue-500 font-semibold transition-all"
                  : "hover:bg-gray-300 p-2 rounded-md cursor-pointer font-semibold transition-all"
              }
                onClick={() => setActiveTab(2)}
              >
                Contact and basic info
              </li>
            </ul>
          </div>
        </div>
        <div className="data w-full bg-white flex flex-col">
          <h1 className="p-2 text-xl font-semibold capitalize">contact info</h1>
          {
            activeTab ==1 && <BasicInfo type="overview"/>
          }
          {
            activeTab ==2 && <BasicInfo type="contactinfo"/> 
          }
          
        </div>
      </div>
    </>
  );
};

export default AboutCon;
