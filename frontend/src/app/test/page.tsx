"use client"

import React, { useEffect } from 'react'

const Test = () => {

  const user = localStorage.getItem("user");

  useEffect(() => {
    console.log('test...');
  });


  return (
    <div>

      <h1>Test</h1>
      {user && (
        <div>
          <h1>User</h1>
          <p>{user}</p>
        </div>
      
      )}
    </div>



  )
}

export default Test