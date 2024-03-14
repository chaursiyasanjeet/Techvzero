"use client";
import React, { FC, useState, useEffect } from "react";
import NotesGroupCreator from "./NotesGroupCreator";
import { getNotes } from "@/apis/User";

interface SidebarProps {
  setNoteChild: (data: any) => void; // Assuming `data` is the type you expect
}
const Sidebar: FC<SidebarProps> = ({ setNoteChild }): JSX.Element => {
  const [popup, setPopup] = useState<boolean>(false);
  const [notes, setNotes] = useState<any[]>([]);
  const getNotesFromData = async () => {
    const result = await getNotes();
    setNotes(result.notes);
  };

  useEffect(() => {
    getNotesFromData();
  }, [popup]);

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
          {notes
            ? notes.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="w-[80%] md:w-[90%] flex gap-4 items-center md:hover:bg-blue-300 cursor-pointer rounded-full"
                    onClick={() => {
                      setNoteChild(item);
                    }}
                  >
                    <div className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center text-xl font-semibold">
                      {item.groupName[0]}
                    </div>
                    <span className="text-2xl font-bold">{item.groupName}</span>
                  </div>
                );
              })
            : ""}
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
