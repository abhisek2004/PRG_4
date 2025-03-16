"use client";
import React, { useEffect, useState } from "react";
import Editor, { loader } from "@monaco-editor/react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { codeatom, flagatom, languageatom } from "@/store/atom";

interface CodeEditorWindowProps {
  theme: any;
  savecodepage: boolean;
}

export const CodeEditorWindow = ({
  savecodepage,
  theme,
}: CodeEditorWindowProps) => {
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);
  const [value, setvalue] = useRecoilState(codeatom);
  const setFlag = useSetRecoilState(flagatom);
  const language = useRecoilValue(languageatom).language!!!;
  
  useEffect(() => {
    loader
      .init()
      .then((monaco: any) => {
        // Load and define the theme
        import(`monaco-themes/themes/${theme}.json`).then((data) => {
          monaco.editor.defineTheme(theme, data);
          setIsThemeLoaded(true);
        });
      })
      .catch((error: any) =>
        console.error(
          "An error occurred during initialization of Monaco: ",
          error
        )
      );
  }, [theme]);

  const handleEditorChange = (value: any) => {
    setvalue({ code: value });
    if (savecodepage) {
      setFlag({ flag: true });
    }
  };

  return (
    <div className="overlay rounded-md overflow-hidden w-full h-[75vh] lg:min-h-[77vh] lg:h-[75vh] shadow-4xl">
      <Editor
        height="85vh"
        width={`100%`}
        language={language || "javascript"}
        value={value.code}
        theme={isThemeLoaded ? theme : "vs-light"} // Use the loaded theme
        defaultValue="// some comment"
        onChange={handleEditorChange}
      />
    </div>
  );
};
