import React from 'react'

interface AuthHeaderProps{
  label: string;
  title: string;
}

const AuthHeader = ({label, title}: AuthHeaderProps) => {
  return (
    <div className='w-full flex flex-col gay-y-4 items-center justify-center'>
      <h1 className='text-3xl font-semibold'>{title}</h1>
      <p className='text-muted-foreground text-sm'>{label}</p>
    </div>
  )
}

export default AuthHeader