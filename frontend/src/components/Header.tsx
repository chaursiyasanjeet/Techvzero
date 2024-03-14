"use client";
import React, { FC } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "../assets/logo.jpg";
import { useAuthContext } from "../Context/Context";

const Header: FC = () => {
  const { isLoggedIn, setLoggedIn } = useAuthContext();
  const navigate = useRouter();
  const login: boolean = isLoggedIn;
  return (
    <>
      <div className="w-full h-[10vh] flex justify-between items-center px-5 bg-violet-300">
        <div className="flex justify-center items-center h-full">
          <Image
            src={logo}
            alt="logo_website"
            className="w-10 h-[70%] self-center mr-1 rounded-md"
          />
          <h1 className="text-2xl font-bold">Spark Note</h1>
        </div>

        {!login ? (
          <div className="flex gap-5 md:gap-10">
            <button
              className="h-80%  w-max px-5 rounded-md font-semibold bg-violet-500 hover:bg-violet-300"
              onClick={() => {
                navigate.push("./login");
              }}
            >
              Login
            </button>

            <button
              className="h-80%  w-max px-5 py-1 rounded-md font-semibold bg-violet-500 hover:bg-violet-300"
              onClick={() => {
                navigate.push("./signup");
              }}
            >
              Sign Up
            </button>
          </div>
        ) : (
          <button
            className="h-80% bg-red-700 w-max px-5 py-1 rounded-md font-semibold"
            onClick={() => {
              localStorage.removeItem("noteJWT"), setLoggedIn(false);
              toast.success("Logout Successfull");
            }}
          >
            Log Out
          </button>
        )}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

export default Header;
