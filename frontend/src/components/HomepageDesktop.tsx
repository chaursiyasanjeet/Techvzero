"use client";
import React, { FC, useContext, useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/NotesSidebar";
import NotesScreen from "@/components/NotesScreen";
import Image from "next/image";
import bgImg from "../assets/editiorBg.png";
import { useAuthContext } from "../Context/Context";

interface Note {
  groupName: string;
  note: string;
}
const HomePageDesktop: FC = () => {
  const { isLoggedIn, setLoggedIn } = useAuthContext();
  const login: boolean = isLoggedIn;
  const [note, setNote] = useState();

  const getNoteData = (data: any) => {
    setNote(data);
  };
  return (
    <div className="w-screen h-screen bg-violet-100 overflow-hidden">
      <Header />
      {login ? (
        <div className="md:flex md:justify-between">
          <div>
            <Sidebar setNoteChild={getNoteData} />
          </div>
          <div className="mt-10 md:mt-0">
            <NotesScreen noteData={note} />
          </div>
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default HomePageDesktop;
