// import axiosInterceptorInstance from "@/axios/axiosInterceptor";
import React, { useEffect } from "react";
import { cookies } from "next/headers";
import CustomError from "@/components/customError";
import axios from "axios";

const page = async () => {
  console.log("test if user is authorized");

  let permissions = [];
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/user/permissions`, {
        headers: { Cookie: cookies().toString() },
        withCredentials: true,
      }
    );

    if (res.status === 200 && res.data.success === true) {
      permissions = res.data.permissions;
    }
  } catch (error: any) {
    console.log(error?.message);
    return <CustomError message={error?.message} />;
  }

  console.log(permissions);

  return (
    <div>
      <h1>i am deaaaaad</h1>
    </div>
  );
};

export default page;
