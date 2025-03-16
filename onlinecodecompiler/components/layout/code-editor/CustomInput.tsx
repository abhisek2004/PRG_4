"use client"
import React from "react";
interface CustomInputProps{
  customInput:string,
  setCustomInput:(value:string) => void;
}

export const CustomInput = ({ customInput, setCustomInput }:CustomInputProps) => {
  return (
    <>
      {" "}
      <textarea
        rows={5}
        value={customInput}
        onChange={(e) => setCustomInput(e.target.value)}
        placeholder={`Custom input`}
        className="focus:outline-none w-full h-[36vh] md:h-[30vh] lg:w-[38vw] lg:min-h-[36vh] lg:h-[36vh]  z-10  resize-none px-4 py-2  bg-card  bg-opacity-15 mt-2  border border-secondary rounded-2xl"
      ></textarea>
    </>
  );
};

