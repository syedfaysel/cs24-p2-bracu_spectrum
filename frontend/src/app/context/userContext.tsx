// context/UserContext.tsx
'use client'
import React, { createContext, useContext, useState } from 'react';

type Permission = {
  _id: string;
  resource_slug: string;
  policy_name: string;
}


type Role = {
  _id: string;
  role_name: string;
  permissions: Permission[];
  role_description: string;
};

type UserData = {
  _id: string;
  username: string;
  email: string;
  roles: Role[];
};

type UserContextType = {
  user: UserData | null;
  setUser: React.Dispatch<React.SetStateAction<UserData | null>>;
};

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => null,
});

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }:any) => {
  const [user, setUser] = useState<UserData | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};




