"use client";
import React, { FC, useState } from "react";
import NotesGroupCreator from "./NotesGroupCreator";

interface SidebarProps {}

const Sidebar: FC<SidebarProps> = (): JSX.Element => {
  const [popup, setPopup] = useState<boolean>(false);

  const setPopupFromChild = (value: boolean): void => {
    setPopup(value);
  };

  return (
    <>
      <section className="w-full flex flex-col mt-5 md:w-[30vw] items-center ">
        <button
          className="w-[70%] md:w-[90%] h-10 text-2xl font-semibold bg-blue-600 rounded-full"
          onClick={() => {
            setPopup(true);
          }}
        >
          + Add Notes group
        </button>
        <div className="mt-5 w-full flex flex-col items-end gap-3">
          <div className="w-[80%] md:w-[90%] flex gap-4 items-center hover:bg-blue-300 cursor-pointer rounded-full">
            <div className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center text-xl font-semibold">
              FN
            </div>
            <span className="text-2xl font-bold">First note</span>
          </div>
          <div className="w-[80%] md:w-[90%] flex gap-4 items-center hover:bg-blue-300 cursor-pointer rounded-full">
            <div className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center text-xl font-semibold">
              FN
            </div>
            <span className="text-2xl font-bold">First note</span>
          </div>
          <div className="w-[80%] md:w-[90%] flex gap-4 items-center hover:bg-blue-300 cursor-pointer rounded-full">
            <div className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center text-xl font-semibold">
              FN
            </div>
            <span className="text-2xl font-bold">First note</span>
          </div>
        </div>
      </section>
      <div
        className={`absolute top-[50vh] md:right-[30vw] right-[10vw]
        ${popup ? "flex" : "hidden"}`}
      >
        <NotesGroupCreator setPopupChild={setPopupFromChild} popup={popup} />
      </div>
    </>
  );
};

export default Sidebar;
