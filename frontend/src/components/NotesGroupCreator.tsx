"use client";
import React, { useRef, useState, ChangeEvent, FormEvent } from "react";
import { getNotes, editNotes } from "@/apis/User";

interface NotesGroupCreatorProps {
  setPopupChild: any;
  popup: boolean;
}

const NotesGroupCreator: React.FC<NotesGroupCreatorProps> = ({
  setPopupChild,
  popup,
}) => {
  const refOne = useRef<HTMLFormElement>(null);
  const handleOutsideClick = (e: MouseEvent) => {
    if (refOne.current && !refOne.current.contains(e.target as Node)) {
      setPopupChild(false);
    }
  };

  if (refOne && refOne.current) {
    document.addEventListener("click", handleOutsideClick, true);
  }

  //creating new group
  const [groupName, setGroupName] = useState<string>("");

  const handleGroupName = (e: ChangeEvent<HTMLInputElement>) => {
    setGroupName(e.target.value);
  };

  const handleSumbit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newGroup = {
      groupName: groupName,
    };

    setGroupName("");
    const result = await getNotes();
    const newNote = [...result.notes, { groupName: groupName, note: "" }];
    const result2 = await editNotes(newNote);
    if (e.target instanceof HTMLFormElement) {
      setPopupChild(false);
    }
    document.removeEventListener("click", handleOutsideClick, true);
  };

  const handleNoteCreate = async () => {};
  return (
    <>
      <form
        onSubmit={handleSumbit}
        ref={refOne}
        className={` flex-col bg-blue-400 p-2 rounded-md w-[80vw] md:w-[30vw] h-[25vh] ${
          popup ? "flex" : "hidden"
        }`}
      >
        <h3 className="font-bold text-xl pl-2 mb-5">Create New Notes group</h3>
        <input
          className="w-[90%] self-center rounded-full px-4 outline-none"
          type="text"
          id="groupName"
          name="groupName"
          placeholder="Enter your group name..."
          value={groupName}
          onChange={handleGroupName}
          required
        />
        <button
          type="submit"
          className="w-[90%] h-[5vh] bg-red-500 self-center rounded-full mt-2 font-bold"
        >
          Create
        </button>
      </form>
    </>
  );
};

export default NotesGroupCreator;
