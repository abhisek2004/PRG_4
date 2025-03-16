"use client";

import React, { useEffect, useState } from "react";
import { DefaultCode } from "@/lib/Languages";
import { useParams, useRouter } from "next/navigation";
import Loading from "@/app/loading";
import MainBoilerPlate from "@/components/layout/MainBoilerPlate";
import { useSetRecoilState } from "recoil";
import { codeatom, languageatom } from "@/store/atom";

function Compiler() {
  const router = useRouter();
  const pramas = useParams<{ language: string }>();
  const language = pramas.language;
  const [loading, setLoading] = useState<boolean>(true);
  const setLanguage = useSetRecoilState(languageatom);
  const setCode1 = useSetRecoilState(codeatom);

  // const enterPress = useKeyPress("Enter");
  // const ctrlPress = useKeyPress("Control");

  // const onSelectChange = useCallback((sl: any) => {
  //   setLanguage(sl);
  // }, []);

  useEffect(() => {
    // console.log("Language changed:", language);
    setLanguage({ language });
    const dc: string = DefaultCode(language);
    if (dc == `LNF`) {
      router.replace(`/not-found`);
    } else {
      setCode1({ code: dc });
      setLoading(false)
    }
  }, []);

  // useEffect(() => {
  //   if (enterPress && ctrlPress) {
  //     handleCompile();
  //   }
  // }, [ctrlPress, enterPress]);

  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <>
      <MainBoilerPlate />
    </>
  );
}

export default Compiler;
