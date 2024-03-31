"use client"

import Logout from '@/components/auth/logout';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';

const Test = () => {
  const [user, setUser] = useState(undefined);
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      console.log(user);
      setUser(user);
    }
    else {
      router.push('/login');
    }
  }, []);


  return (
    <div>

      <h1>Dashboard</h1>
      {!!user && (
        <div>
          <Logout />
        </div>
      
      )}
    </div>



  )
}

export default Test