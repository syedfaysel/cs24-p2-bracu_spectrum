"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useToast } from '@/components/ui/use-toast';



const Profile = ({ params }: {
  params:{userId: string}
}) => {

  const { userId } = params;

  const { toast } = useToast();
  const [data, setData] = useState<any>(null);
  
  const getUser = async () => {
    try {
      const res = await axios(`${process.env.NEXT_PUBLIC_BACKEND_API}/user/${userId}`);
      if(res.status === 200 && res.data.success === true){
        setData(res.data.data);
      }
    }
    catch (error:any) {
      toast({ variant: "destructive", title: "Error", description: `${error?.message}` })
    }
  }

  useEffect(() => {
    getUser();
  },[])
  
  return (
    <div>
      <h1>This is user profile page</h1>
      <p>User ID: {userId}</p>
    </div>
  );
};

export default Profile;