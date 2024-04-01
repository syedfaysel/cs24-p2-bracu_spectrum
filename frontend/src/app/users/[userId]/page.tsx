import React from 'react';
import axios from "axios";


interface Props {
  userId: string;
}

const page = async ({ params }: {params: Props}) => {


  let user: any;
  const userId = params.userId;
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/users/${userId}`,
    {
      withCredentials: true
    }
  );


  if (res.status === 200 && res.data.success === true) {
    user = res.data.users;
  } else {
    return <div>Failed to fetch users</div>
  }


  return (
    <div className=''>
      <ul>
        {user &&  (
            <div key={user._id}>
              <p>User ID: {user._id}</p>
              <p>Username: {user.username}</p>
              <p>Email:{user.email}</p>
            </div>
          )
        }
      </ul>
    </div>
  );
};

export default page;