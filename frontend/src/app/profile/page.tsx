"use client"

import Logout from '@/components/auth/logout';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import ProfilePage from '@/components/Profile';

const page = () => {


  const user:any = [];

  return (
    <div>
      <ProfilePage />
    </div>



  )
}

export default page;