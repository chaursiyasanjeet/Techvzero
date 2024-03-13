import React, { FC } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/NotesSidebar";
import NotesScreen from "@/components/NotesScreen";
import Image from "next/image";
import bgImg from "../assets/editiorBg.png";
const Page: FC = () => {
  const login: boolean = false;
  const selected: boolean = false;
  return (
    <div className="w-screen h-screen bg-violet-100 overflow-hidden">
      <Header />
      {login ? (
        <div className="flex flex-col justify-center items-center h-[90vh] gap-5">
          <Image
            src={bgImg}
            alt="logo"
            className="w-[50vw] h-[40vh] rounded-md"
          />
          <h1 className="text-4xl font-bold">Spark Note</h1>
          <p className="text-center w-[80vw] font-semibold">
            Your Ultimate Note-Taking Companion for Seamless Organization and
            Productivity.
          </p>
        </div>
      ) : (
        <div className="md:flex md:justify-between">
          <div>
            <Sidebar />
          </div>
          {selected ? (
            <div className="flex-col pt-10 items-center w-[70vw] h-[90vh] gap-5 hidden md:flex bg-violet-200">
              <Image
                src={bgImg}
                alt="logo"
                className="w-[50vw] h-[50%] rounded-md"
              />
              <h1 className="text-4xl font-bold">Spark Note</h1>
              <p className="text-center  font-semibold">
                Your Ultimate Note-Taking Companion for Seamless Organization
                and Productivity.
              </p>
            </div>
          ) : (
            <div className="hidden md:block">
              <NotesScreen />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Page;
