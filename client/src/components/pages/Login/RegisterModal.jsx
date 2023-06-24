import { Box, Modal } from "@mui/material";
import React, { useContext, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

import { useLocation } from "react-router-dom";
import { useDispatchContext } from "../../../state";

const RegisterModal = ({ open, handleClose }) => {
  
  const dispatch = useDispatchContext();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender , setGender] = useState("");
  const [firstname , setFirstName] = useState("");
  const [lastname , setLastName] = useState("");
  const [error , setError] = useState("");


  const location = useLocation();
  
  const handleSubmit = (e) => {
    dispatch({ type: "LOGIN_REQUEST" });
    e.preventDefault();
    let fullname = firstname + " " + lastname;
    // const hashedPassword = bcrypt.hashSync(password, 10)
    const config = {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.NjQ3YzM1ZTE5NjI5ZjVjNmVjZjk4NzE5.wVbsAu64rZb8r3ZCRISQHMCsdyCs1exZyFOKcm0bowQ",
        'Content-Type': "application/json",
      },
      data: {
        name: fullname,
        email : email,
        password: password,
        dob: dobObject,
        gender: gender,
      },
    };
    axios
      .post("http://localhost:3000/api/user", config)
      .then((response) => {
        console.log(response);
        if((response.status== 201 || statusText== "Created") && response.data._id){
          localStorage.setItem("user", JSON.stringify(response.data));
          localStorage.setItem("token", JSON.stringify(response.data.token));
          dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
          location("/")
        }
      })
      .catch((error) => {
        if (error.status == 401) {
          setError("Invalid password or email address")
        }
      });


  };


  let dobObject = {day: '1', month : 'January', year: "2023"};

  const handleSelectDOB = (e, index)=>{
   if(index==1){
    dobObject.day= e.target.value;
   }
   if(index==2){
    dobObject.month= e.target.value;
   }
   if(index==3){
    dobObject.year= e.target.value;
   }
  }
  
  
  
  
  
  
  
  
  
  
  
  
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 432,
    bgcolor: "background.paper",
    display: "flex",
    flexDirection: "column",
    gap: ".5rem",
  };

  return (
    <>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="header flex justify-between items-center p-4 py-2">
              <div>
                <h1 className="text-3xl font-bold">Sign Up</h1>
                <p className="text-gray-600">It's quick and easy.</p>
              </div>
              <CloseIcon
                fontSize="medium"
                style={{ color: "gray", cursor: "pointer" }}
                onClick={handleClose}
              />
            </div>
            <hr />
            <div className="p-4 pt-1">
              <form
              onSubmit={(e) => handleSubmit(e)}
                className="flex flex-wrap items-center justify-between gap-3"
              >
                <input
                  className="bg-gray-100 p-2 outline-none rounded-[5px] border-[1px] border-gray-400/40 w-[194px]"
                  type="text"
                  placeholder="First Name"
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                  className="bg-gray-100 p-2 outline-none rounded-[5px] border-[1px] border-gray-400/40 w-[194px]"
                  type="text"
                  placeholder="Surname"
                  onChange={(e) => setLastName(e.target.value)}
                />
                <input
                  className="bg-gray-100 p-2 outline-none rounded-[5px] border-[1px] border-gray-400/40 w-full"
                  type="email"
                  placeholder="Email address"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  className="bg-gray-100 p-2 outline-none rounded-[5px] border-[1px] border-gray-400/40 w-full"
                  type="password"
                  placeholder="New password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="DateOfBirth w-full">
                  <h1 className="text-xs mb-2">Date of Birth</h1>
                  <div className="w-full flex flex-row justify-between">
                    <select
                      onChange={(e)=>handleSelectDOB(e, 1)}
                      name="birthday_day"
                      id="day"
                      title="day"
                      className="p-2 w-full bg-white border-[1px] border-gray-400/40  min-h-[36px] max-w-[126px]  outline-none rounded-[5px]"
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                    </select>
                    <select
                    onChange={(e)=>handleSelectDOB(e, 2)}
                      name="birthday_month"
                      id="months"
                      title="months"
                      className="p-2 w-full bg-white border-[1px] border-gray-400/40 min-h-[36px] max-w-[120px]  outline-none rounded-[5px]"
                    >
                      <option value="January">January</option>
                      <option value="February">February </option>
                      <option value="March"> March</option>
                      <option value="April"> April</option>
                      <option value="May">May</option>
                      <option value="June"> June</option>
                      <option value="July"> July</option>
                      <option value="August"> August</option>
                      <option value="September"> September</option>
                      <option value="October"> October</option>
                      <option value="November"> November</option>
                      <option value="December"> December</option>
                    </select>
                    <select
                    onChange={(e)=>handleSelectDOB(e, 3)}
                      name="birthday_year"
                      id="year"
                      title="year"
                      className="p-2 w-full bg-white border-[1px] border-gray-400/40  min-h-[36px] max-w-[126px] outline-none rounded-[5px]"
                    >
                      <option value="2023">2023</option>
                      <option value="2022">2022</option>
                      <option value="2021">2021</option>
                      <option value="2020">2020</option>
                      <option value="2019">2019</option>
                      <option value="2018">2018</option>
                      <option value="2017">2017</option>
                      <option value="2016">2016</option>
                      <option value="2015">2015</option>
                      <option value="2014">2014</option>
                      <option value="2013">2013</option>
                      <option value="2012">2012</option>
                      <option value="2011">2011</option>
                      <option value="2010">2010</option>
                      <option value="2009">2009</option>
                      <option value="2008">2008</option>
                      <option value="2007">2007</option>
                      <option value="2006">2006</option>
                      <option value="2005">2005</option>
                      <option value="2004">2004</option>
                      <option value="2003">2003</option>
                      <option value="2002">2002</option>
                      <option value="2001">2001</option>
                      <option value="2000">2000</option>
                      <option value="1999">1999</option>
                    </select>
                  </div>
                </div>
                <div className="Gender w-full">
                  <h1 className="text-xs mb-2">Gender</h1>
                  <div className="radiobtn flex w-full justify-between">
                    <span className="cursor-pointer p-2 w-full bg-white border-[1px] border-gray-400/40  min-h-[36px] max-w-[126px] outline-none rounded-[5px] flex justify-between">
                      <label htmlFor="male" className="w-full">
                        Male
                      </label>
                      <input
                        onChange={()=>setGender("male")}
                        type="radio"
                        name="gender"
                        id="male"
                        value="male"
                      />
                    </span>
                    <span className="cursor-pointer p-2 w-full bg-white border-[1px] border-gray-400/40  min-h-[36px] max-w-[126px] outline-none rounded-[5px] flex justify-between">
                      <label htmlFor="female" className="w-full">
                        Female
                      </label>
                      <input
                      onChange={()=>setGender("female")}
                        type="radio"
                        name="gender"
                        id="female"
                        value="female"
                      />
                    </span>
                    <span className="cursor-pointer p-2 w-full bg-white border-[1px] border-gray-400/40  min-h-[36px] max-w-[126px] outline-none rounded-[5px] flex justify-between">
                      <label htmlFor="other" className="w-full">
                        Other
                      </label>
                      <input
                       onChange={()=>setGender("other")}
                        type="radio"
                        name="gender"
                        id="other"
                        value="other"
                      />
                    </span>
                  </div>
                </div>
                <div className="policy flex flex-col gap-1">
                    <span className="text-[10px]">People who use our service may have uploaded your contact information to Facebook. Learn more.</span>
                    <span className="text-[10px]">By clicking Sign Up, you agree to our Terms, Privacy Policy and Cookies Policy. You may receive SMS notifications from us and can opt out at any time.</span>
                </div>
                <div className="block text-center p-2 w-full">
                    <button className="text-white p-2 text-lg font-bold rounded-[5px] w-[200px] bg-[#42b72a]">Sign Up</button>
                </div>
              </form>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default RegisterModal;
