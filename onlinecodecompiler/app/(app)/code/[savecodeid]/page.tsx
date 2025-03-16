"use client";
import Loading from "@/app/loading";
import axios from "axios";
import MainBoilerPlate from "@/components/layout/MainBoilerPlate";
import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { codeatom, flagatom, languageatom } from "@/store/atom";

interface CodeData {
  id: string;
  fileName: string;
  code: string;
  language: string;
  createdAt: string;
}

function SaveCode() {
  const router = useRouter();
  const params = useParams<{ savecodeid: string }>();
  const codeid = params.savecodeid;
  const [filename, setFilename] = useState<string>("");
  const setLanguage = useSetRecoilState(languageatom);
  const setCode = useSetRecoilState(codeatom);
  const flag = useRecoilValue(flagatom).flag!!!;

  const fetchsaveCodeApi = async () => {
    const response = await axios.get(`/api/save-code?codeID=${codeid}`);
    return response.data.codeData;
  };

  const fetchsaveCodeMutaion = useMutation({
    mutationFn: fetchsaveCodeApi,
    retry: 1,
    onSuccess: (data: CodeData) => {
      setCode({ code: atob(data.code) });
      setLanguage({ language: data.language });
      setFilename(data.fileName);
    },
    onError: (error: any) => {
      router.replace(`/not-found`);
    },
  });

  useEffect(() => {
    function getSaveCode() {
      fetchsaveCodeMutaion.mutate();
    }

    if (codeid) {
      getSaveCode();
    }
  }, [codeid]);

  useEffect(() => {
    function confirmExit(event: BeforeUnloadEvent) {
      if (flag) {
        event.preventDefault();
      }
    }
  
    window.addEventListener("beforeunload", confirmExit);
  
    return () => {
      window.removeEventListener("beforeunload", confirmExit);
    };
  }, [flag]);
  
  if (fetchsaveCodeMutaion.isPending) {
    return <Loading />;
  }

  return (
    <>
      <MainBoilerPlate filename={filename} />
    </>
  );
}

export default SaveCode;
