import React, { FC, useEffect, useState } from "react";
import backLogo from "../assets/backlogo.svg";
import Image from "next/image";
import { getNotes, editNotes } from "@/apis/User";
import bgImage from "../assets/editiorBg.png";

interface noteDetail {
  noteData?: {
    groupName: string;
    note: string;
  };
  setView: any;
}

const NotesScreen: FC<noteDetail> = ({ noteData, setView }) => {
  const [noteStore, setStoreNote] = useState<string | undefined>(
    noteData?.note || ""
  );

  function throttle(func: any, delay: any) {
    let timer;

    if (timer) {
      clearTimeout(timer);
    }
    return function () {
      timer = setTimeout(() => {
        func();
      }, delay);
    };
  }

  useEffect(() => {
    setStoreNote(noteData?.note || "");
  }, [noteData]);

  const handleNoteStore = (e: any) => {
    setStoreNote(e.target.value);
    const throttledFunc = throttle(async () => {
      const result = await getNotes();

      if (noteData?.groupName) {
        const index = result.notes.findIndex(
          (note: any) => note.groupName === noteData.groupName
        );
        if (index !== -1) {
          result.notes[index].note = noteStore;
        }

        const result2 = await editNotes(result.notes);
      }
    }, 1000);

    throttledFunc();
  };
  return (
    <section className="w=[100vw] md:w-[70vw] h-[90vh] bg-violet-200">
      {/* Notes title start */}
      {noteData ? (
        <>
          <div className="w-[100%] h-[10vh] bg-violet-500 flex items-center pl-2 md:pl-5">
            <div className="w-[80%] md:w-[90%] flex gap-4 items-center rounded-full">
              <Image
                src={backLogo}
                className="md:hidden bg-white w-[8%] h-[80%] rounded-full p-2 cursor-pointer"
                alt="backIcon"
                onClick={() => {
                  setView();
                }}
              />
              <div className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center text-xl font-semibold">
                {noteData?.groupName[0]}
              </div>
              <span className="text-2xl font-bold">{noteData?.groupName}</span>
            </div>
          </div>
          {/* Notes title end */}

          {/* Actual notes content start */}
          <textarea
            placeholder="Enter Your Notes Here"
            className="w-[100vw] md:w-[70vw] h-[80vh] p-5 text-xl resize-none"
            value={noteStore}
            onChange={handleNoteStore}
          ></textarea>
        </>
      ) : (
        <div className="flex flex-col justify-center items-center h-[90vh] gap-5">
          <Image
            src={bgImage}
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
    </section>
  );
};

export default NotesScreen;
