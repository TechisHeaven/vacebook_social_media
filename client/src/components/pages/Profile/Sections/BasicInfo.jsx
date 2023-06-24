import React, { useContext } from "react";
import CallIcon from "@mui/icons-material/Call";
import EditIcon from "@mui/icons-material/Edit";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import Person2Icon from "@mui/icons-material/Person2";
import CakeIcon from "@mui/icons-material/Cake";
import Person2RoundedIcon from "@mui/icons-material/Person2Rounded";
import { useStateContext } from "../../../../state";

const BasicInfo = ({ type }) => {
  const state = useStateContext();
  let { user } = state.user;

  return (
    <>
      <div className="items flex flex-col gap-4 min-h-[348px]">
        {type == "overview" && (
          <>
            <div className="item flex flex-row w-full justify-between p-2 pr-4">
              <div className="flex gap-2 items-center">
                <Person2RoundedIcon style={{ color: "gray" }} />
                <div className="text-gray-600">
                  <p>{user.name}</p>
                  <span className="text-xs">fullname</span>
                </div>
              </div>
              <div className="p-2 flex rounded-full bg-gray-200">
                <EditIcon style={{ color: "gray" }} />
              </div>
            </div>
            {user.phone ? (
              <div className="item flex flex-row w-full justify-between p-2 pr-4">
                <div className="flex gap-2 items-center">
                  <CallIcon style={{ color: "gray" }} />
                  <div className="text-gray-600">
                    <p>{user.phone}</p>
                    <span className="text-xs">mobile</span>
                  </div>
                </div>
                <div className="p-2 flex rounded-full bg-gray-200">
                  <EditIcon style={{ color: "gray" }} />
                </div>
              </div>
            ) : null}
            <div className="item flex flex-row w-full justify-between p-2 pr-4">
              <div className="flex gap-2 items-center">
                <EmailOutlinedIcon style={{ color: "gray" }} />
                <div className="text-gray-600">
                  <p>{user.email}</p>
                  <span className="text-xs">email</span>
                </div>
              </div>
              <div className="p-2 flex rounded-full bg-gray-200">
                <EditIcon style={{ color: "gray" }} />
              </div>
            </div>
          </>
        )}
        {type == "contactinfo" && (
          <>
            {user.phone ? (
              <div className="item flex flex-row w-full justify-between p-2 pr-4">
                <div className="flex gap-2 items-center">
                  <CallIcon style={{ color: "gray" }} />
                  <div className="text-gray-600">
                    <p>{user.phone}</p>
                    <span className="text-xs">mobile</span>
                  </div>
                </div>
                <div className="p-2 flex rounded-full bg-gray-200">
                  <EditIcon style={{ color: "gray" }} />
                </div>
              </div>
            ) : null}
            <div className="item flex flex-row w-full justify-between p-2 pr-4">
              <div className="flex gap-2">
                <EmailOutlinedIcon style={{ color: "gray" }} />
                <div className="text-gray-600">
                  <p>{user.email}</p>
                  <span className="text-xs">email</span>
                </div>
              </div>
              <div className="p-2 flex rounded-full bg-gray-200">
                <EditIcon style={{ color: "gray" }} />
              </div>
            </div>
            <div className="item flex flex-row w-full justify-between p-2 pr-4">
              <div className="flex gap-2">
                <Person2Icon style={{ color: "gray" }} />
                <div className="text-gray-600">
                  <p className="capitalize">{user.gender}</p>
                  <span className="text-xs">gender</span>
                </div>
              </div>
              <div className="p-2 flex rounded-full bg-gray-200">
                <EditIcon style={{ color: "gray" }} />
              </div>
            </div>
            <div className="item flex flex-row w-full justify-between p-2 pr-4">
              <div className="flex gap-2">
                <CakeIcon style={{ color: "gray" }} />
                <div className="text-gray-600">
                  <p className="flex gap-1">
                    <span>{user.dob.day}</span>
                    <span>{user.dob.month}</span>
                    <span>{user.dob.year}</span>
                  </p>
                  <span className="text-xs">Birth day and year</span>
                </div>
              </div>
              <div className="p-2 flex rounded-full bg-gray-200">
                <EditIcon style={{ color: "gray" }} />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default BasicInfo;
