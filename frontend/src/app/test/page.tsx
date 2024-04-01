// import axiosInterceptorInstance from "@/axios/axiosInterceptor";
import React, { useEffect } from "react";
import CustomError from "@/components/customError";
import { getPermissions } from "@/lib/getPermission";
import { checkPermission } from "@/lib/checkPermission";

const page = async () => {

  let permissions = [];
  permissions = await getPermissions(); // important


  const authorized = checkPermission("rbac.all", permissions);
  // console.log("authorized", authorized);
  if (!authorized) {
    return <CustomError message="Not authorized" />;
  }

  return (
    <div>
      <h1>Only system Admin can see this page</h1>
      
    </div>
  );
};

export default page;
