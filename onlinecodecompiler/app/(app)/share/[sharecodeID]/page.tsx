"use client";
import Loading from "@/app/loading";
import MainBoilerPlate from "@/components/layout/MainBoilerPlate";
import { languageatom, codeatom } from "@/store/atom";
import { useMutation } from "@tanstack/react-query";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";

interface ShareCodeDataProps {
  id: string;
  code: string;
  language: string;
}

function ShareCode() {
  const router = useRouter();
  const params = useParams<{ sharecodeID: string }>();
  const codeid = params.sharecodeID;
  const setLanguage = useSetRecoilState(languageatom);
  const setCode = useSetRecoilState(codeatom);

  const fetchshareCodeApi = async () => {
    const response = await axios.get(`/api/share?codeID=${codeid}`);
    return response.data.codeData;
  };

  const fetchshareCodeMutaion = useMutation({
    mutationFn: fetchshareCodeApi,
    retry: 3,
    onSuccess: (data: ShareCodeDataProps) => {
      setCode({ code: atob(data.code) });
      setLanguage({ language: data.language });
    },
    onError: (error: any) => {
      router.replace(`/not-found`);
    },
  });

  useEffect(() => {
    function getSaveCode() {
      fetchshareCodeMutaion.mutate();
    }

    if (codeid) {
      getSaveCode();
    }
  }, [codeid]);

  if (fetchshareCodeMutaion.isPending) {
    return <Loading />;
  }

  return (
    <>
      <MainBoilerPlate />
    </>
  );
}

export default ShareCode;
