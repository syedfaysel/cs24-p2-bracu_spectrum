import React from 'react';
import axios from "axios";
import Link from 'next/link';



const page = async () => {


  let users:any = [];
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/users`,
    {
      withCredentials: true
    }
  );


  if (res.status === 200 && res.data.success === true) {
    users = res.data.users;
  } else {
    return <div>Failed to fetch users</div>
  }


  return (
    <div className=''>
      <ul>
        {users && users.map((user: any) => {
          return (
            <div key={user._id}>
              <p>User ID: {user._id}</p>
              <p>Username: {user.username}</p>
              <p>Email:{user.email}</p>
              <Link href={`/users/${user._id}`}>View User</Link>
            </div>
          )
        })}
      </ul>
    </div>
  );
};

export default page;