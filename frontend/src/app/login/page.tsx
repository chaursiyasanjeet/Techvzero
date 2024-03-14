"use client";
import React, { FC, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Image from "next/image";
import logo from "../../assets/logo.jpg";
import { useRouter } from "next/navigation";
import { login } from "@/apis/Auth";
import { useAuthContext } from "../../Context/Context";

interface User {
  email: string;
  password: string;
}

const Login: FC = () => {
  const { isLoggedIn, setLoggedIn } = useAuthContext();
  const navigate = useRouter();

  if (isLoggedIn) {
    navigate.push("./");
  }
  const [user, setUser] = useState<User>({
    email: "",
    password: "",
  });
  const validateForm = (email: string, password: string): boolean => {
    let error = false;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Enter valid email");
      error = true;
    }
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        password
      )
    ) {
      toast.error(
        "Password should contain at least one uppercase, one lowercase, one number, and one special character"
      );
      error = true;
    }

    return !error;
  };

  const handleSumbit = async (
    e: React.FormEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault();
    const validate: boolean = validateForm(user.email, user.password);
    if (validate) {
      const result = await login(user.email, user.password);
      if (result.status === "SUCCESS") {
        localStorage.setItem("noteJWT", result.token);
        toast.success("Login Successfully");

        setTimeout(() => {
          setLoggedIn(true);
          navigate.push("./");
        }, 2000);
      } else {
        toast.error(result.message);
      }
    }
  };
  return (
    <>
      <div
        className="w-full h-[10vh] flex items-center px-5 bg-violet-300 cursor-pointer"
        onClick={() => {
          navigate.push("./");
        }}
      >
        <Image
          src={logo}
          alt="logo_website"
          className="w-10 h-[70%] self-center mr-1 rounded-md"
        />
        <h1 className="text-2xl font-bold">Spark Note</h1>
      </div>
      <div className="bg-violet-100 min-h-screen flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full border-4">
            <h1 className="mb-8 text-3xl text-center">Log In</h1>

            <input
              type="text"
              className="block border-2 border-grey-light w-full p-3 rounded mb-4"
              name="email"
              placeholder="Email"
              value={user.email}
              onChange={(e) => {
                setUser({ ...user, email: e.target.value });
              }}
            />
            <input
              type="password"
              className="block border-2 border-grey-light w-full p-3 rounded mb-4"
              name="password"
              placeholder="Password"
              value={user.password}
              onChange={(e) => {
                setUser({ ...user, password: e.target.value });
              }}
            />
            <button
              type="submit"
              className="block bg-violet-950 text-white text-xl border-2 border-black w-full p-3 rounded mb-4"
              onClick={handleSumbit}
            >
              Login
            </button>

            <div className="text-center text-sm text-grey-dark mt-4">
              By signing up, you agree to the
              <a
                className="no-underline border-b border-grey-dark text-grey-dark"
                href="#"
              >
                Terms of Service
              </a>{" "}
              and
              <a
                className="no-underline border-b border-grey-dark text-grey-dark"
                href="#"
              >
                Privacy Policy
              </a>
            </div>
          </div>

          <div className="text-grey-dark mt-1">
            Don't have an account?{" "}
            <a
              className="no-underline text-blue-600 border-b border-blue "
              href="../signup"
            >
              Sign Up here
            </a>
            .
          </div>
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
      </div>
    </>
  );
};

export default Login;
