//@ts-nocheck

"use client"

import React from "react";

export const OutputWindow = ({ outputDetails }) => {
  const getOutput = () => {
    let statusId = outputDetails?.status?.id;

    if (statusId === 6) {
      // compilation error
      return (
        <pre className="px-2 py-1 font-normal text-lg text-red-500">
          {atob(outputDetails?.compile_output)}
        </pre>
      );
    } else if (statusId === 3) {
      return (
        <pre className="px-2 py-1 font-normal text-lg text-green-500">
          {atob(outputDetails.stdout) !== null
            ? `${atob(outputDetails.stdout)}`
            : null}
        </pre>
      );
    } else if (statusId === 5) {
      return (
        <pre className="px-2 py-1 font-normal text-lg text-red-500">
          {`Time Limit Exceeded`}
        </pre>
      );
    } else {
      return (
        <pre className="px-2 py-1 font-normal text-lg text-red-500">
          {atob(outputDetails?.stderr)}
        </pre>
      );
    }
  };
  return (
    <>
    <h1 className="font-bold text-xl bg-clip-text text-transparent text-white pb-4">
      Output
    </h1>
    <div className="w-full h-[37vh] lg:w-[38vw] lg:min-h-[40vh] lg:h-[38vh] bg-card border border-secondary rounded-2xl shadow-inner bg-opacity-15  text-white font-normal text-sm overflow-y-auto p-2">
      {outputDetails ? (
        <>
        {getOutput()}
          <div className="px-2 py-1  text-sm text-white">
            <p><span className="text-gray-400">Status:</span> {outputDetails?.status?.description || "Unknown"}</p>
            <p><span className="text-gray-400">Memory:</span> {outputDetails?.memory ? `${(outputDetails.memory / 1024).toFixed(2)} KB` : "N/A"}</p>
            <p><span className="text-gray-400">Time:</span> {outputDetails?.time ? `${outputDetails.time} ms` : "N/A"}</p>
          </div>
          
        </>
      ) : null}
    </div>
  </>
  );
};


