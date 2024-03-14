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
const HomePageMobile: FC = () => {
  const { isLoggedIn, setLoggedIn } = useAuthContext();
  const login: boolean = isLoggedIn;
  const [note, setNote] = useState();
  const [view, setView] = useState(true);

  const getNoteData = (data: any) => {
    setView(false);
    setNote(data);
  };

  const setViewScreen = () => {
    setView(true);
  };
  return (
    <div className="w-screen h-screen bg-violet-100 overflow-hidden md:hidden">
      <Header />
      {login ? (
        <div className="flex justify-between">
          {view ? (
            <Sidebar setNoteChild={getNoteData} />
          ) : (
            <NotesScreen noteData={note} setView={setViewScreen} />
          )}
        </div>
      ) : (
        <div className="w-[100vw]flex-col justify-center items-center h-[90vh] gap-5">
          <Image
            src={bgImg}
            alt="logo"
            className="w-[100vw] h-[40vh] rounded-md"
            onClick={() => {
              setView(false);
            }}
          />
          <h1 className="text-4xl font-bold text-center">Spark Note</h1>
          <p className="text-center w-[100vw] font-semibold">
            Your Ultimate Note-Taking Companion for Seamless Organization and
            Productivity.
          </p>
        </div>
      )}
    </div>
  );
};

export default HomePageMobile;
