import React from "react";
import backLogo from "../assets/backlogo.svg";
import Image from "next/image";

const NotesScreen = () => {
  return (
    <section className="w=[100vw] md:w-[70vw] h-[90vh] bg-violet-200">
      {/* Notes title start */}
      <div className="w-[100%] h-[10vh] bg-violet-400 flex items-center pl-2 md:pl-5">
        <div className="w-[80%] md:w-[90%] flex gap-4 items-center hover:bg-blue-300 cursor-pointer rounded-full">
          <Image
            src={backLogo}
            className="md:hidden bg-white w-[8%] h-[80%] rounded-full p-2 cursor-pointer"
            alt="backIcon"
          />
          <div className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center text-xl font-semibold">
            FN
          </div>
          <span className="text-2xl font-bold">First note</span>
        </div>
      </div>
      {/* Notes title end */}

      {/* Actual notes content start */}
      <textarea
        placeholder="Enter Your Notes Here"
        className="w-[100vw] md:w-[70vw] h-[80vh] p-5 text-xl resize-none"
      ></textarea>
    </section>
  );
};

export default NotesScreen;
