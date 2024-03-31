"use client";
// import axios from "axios";
import axios from "@/axios/axiosInterceptor";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { redirect, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

const Logout = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const onLogout = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/auth/logout`, {
        withCredentials: true,
        headers: {},
      });

      // console.log(res.data);
      if (res.status === 200) {
        if (res.data.success === true) {
          console.log(res.data);
          toast({
            description: "Logout Successful",
          });
          window.localStorage.removeItem("user");
        }
        router.push("/login")
      }
    } catch (error: any) {
      // console.log(error.message)
      toast({
        variant: "destructive",
        title: "Logout Failed",
        description: `${error.message}`,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button variant={"default"} onClick={onLogout}>
      {/* <Link href="/login">Login</Link> */}
      Logout
    </Button>
  );
};

export default Logout;
