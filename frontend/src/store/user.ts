import { create } from 'zustand'


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


export const userStore = create((set) => ({
  user: {
    username: "Rajo",
    email: "sfa.rajo20@gmail.com",
  }, 

  updateUser: (newUser: any) => set((state: any) => ({
    useer: {...state.user, ...newUser}
  }))
}))