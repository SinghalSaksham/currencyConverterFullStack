import React, { useState, useEffect } from "react";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emptyField, setEmptyField] = useState(false);
  const [incorrectCredential, setIncorrectCredential] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setEmptyField(false);
    setIncorrectCredential(false);
    console.log(email, password);
    if (email == "" || password == "") {
      setEmptyField(true);
      return;
    }
    setIsLoading(true);

    await axios
      .post(`${process.env.REACT_APP_BASE_URL}/user/login`, {
        email,
        password,
      })
      .then((res) => {
        // console.log("response", res.data);
        window.sessionStorage.setItem("user", JSON.stringify(res.data));

        window.location.href = "/";
      })
      .catch((error) => {
        console.log("error", error);
        setEmptyField(false);
        setIncorrectCredential(true);
      });
    setIsLoading(false);
  };

  useEffect(() => {
    sessionStorage.removeItem("user");
  }, []);

  return (
    <>
      {/* <div className="absolute top-0 left-0 w-full z-10  flex-col flex items-center justify-center"> */}
      <div className="h-screen w-full relative">
        {/* <div className="w-4/5 h-fit p-10 flex flex-col">
            <si
        </div> */}
        <img
          src="Assets/dashboard.jpg"
          alt="background image"
          className="h-screen w-full object-cover sm:block"
        />
        <div className="absolute top-0 left-0 w-full z-10  flex-col flex items-center justify-center container2 pt-36">
          <div className="w-3/4 md:w-3/5 h-fit px-2 py-5 md:p-10 flex flex-col rounded-md bg-[#ffffffc6] drop-shadow-2xl shadow-slate-950 space-y-6">
            <h3 className="w-full text-center text-4xl font-bold ">Sign In</h3>
            <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row items-center w-full justify-around">
              <label htmlFor="email" className="w-1/5">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full md:w-3/5 py-2 px-3 rounded-xl outline-none border focus:border-blue-500 border-slate-400"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row items-center w-full justify-around">
              <label htmlFor="password" className="w-1/5">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full md:w-3/5 py-2 px-3 rounded-xl outline-none border focus:border-blue-500 border-slate-400"
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {emptyField && (
              <p className="text-red-600 text-center w-full">
                Email or Password cannot be empty
              </p>
            )}
            {incorrectCredential && (
              <p className="text-red-600 text-center w-full">
                Email or Password doesn't match
              </p>
            )}
            <div className="flex justify-center items-center">
              <button
                className="px-5 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-600 focus:bg-blue-800 font-semibold"
                onClick={handleSubmit}
                type="submit"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      {isLoading ? (
        <div className="fixed top-0 left-0 bottom-0 right-0 flex items-center justify-center bg-black bg-opacity-30 text-white z-50">
          <CircularProgress
            color="inherit"
            size="7rem"
            className="self-center"
          />
        </div>
      ) : null}
    </>
  );
};

export default SignIn;
