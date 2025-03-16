"use client"
import Signin from "@/components/layout/auth/signin";
import { Suspense } from "react";

const Page = () => {
  return (
    <div>

      
      {/* <Suspense fallback={<div>Loading...</div>}> */}
        <Signin />
      {/* </Suspense> */}
    </div>
  );
};

export default Page;
