"use client";
import { CodeEditorWindow } from "@/components/layout/code-editor/CodeEditorWindow";
import { CustomInput } from "@/components/layout/code-editor/CustomInput";
import { OutputWindow } from "@/components/layout/code-editor/OutputWindow";
import { LeftNavbar } from "@/components/layout/compiler/LeftNavbar";
import { Navbar } from "./Navbar1";
import { Navbar2 } from "@/components/layout/Navbar2";
import { flagatom } from "@/store/atom";

import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { Geminichat } from "../aiintegration/geminichat";
import { useSession } from "next-auth/react";

interface MainBoilerPlateProps {
  filename?: string;
}

function MainBoilerPlate({ filename }: MainBoilerPlateProps) {
  const { data: session } = useSession();
  const [customInput, setCustomInput] = useState<string>("");
  const [outputDetails, setOutputDetails] = useState(null);
  const [isOutputVisible, setIsOutputVisible] = useState(false);
  const flag = useRecoilValue(flagatom).flag!!!;

  const toggleOutputVisibility = () => {
    setIsOutputVisible(!isOutputVisible);
  };

  return (
    <>
      <div className="h-[100vh] overflow-hidden">
        <div>
          <Navbar homepage={false} />
        </div>

        <div className="flex w-screen gap-4">
          <LeftNavbar />

          <div className="">
            <div className="flex gap-6">
              <div className="">
                <div className="flex gap-12">
                  <Navbar2
                    customInput={customInput}
                    setOutputDetails={setOutputDetails}
                    flag={filename ? flag : true}
                    filename={filename}
                    toggleOutputVisibility={toggleOutputVisibility}
                    isOutputVisible={isOutputVisible}

                  />
                </div>
                <div className="w-[99.5vw] p-2  lg:p-0  lg:w-[53vw]">
                  {!isOutputVisible ? (
                    <CodeEditorWindow
                      savecodepage={filename ? true : false}
                      theme="Monokai"
                    />
                  ) : (
                    <div className=" ">
                      <OutputWindow outputDetails={outputDetails} />
                      <CustomInput
                        customInput={customInput}
                        setCustomInput={setCustomInput}
                      />
                      {session && <Geminichat />}
                    </div>
                  )}
                </div>
              </div>
              <div className="lg:block">
                  <OutputWindow outputDetails={outputDetails} />
                  <CustomInput
                    customInput={customInput}
                    setCustomInput={setCustomInput}
                  />
                  {session && <Geminichat />}
                </div>
              {isOutputVisible && (
                <div className="">
                  <OutputWindow outputDetails={outputDetails} />
                  <CustomInput
                    customInput={customInput}
                    setCustomInput={setCustomInput}
                  />
                  {session && <Geminichat />}
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainBoilerPlate;
