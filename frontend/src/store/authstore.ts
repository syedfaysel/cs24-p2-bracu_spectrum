import { create } from 'zustand';
import {persist} from 'zustand/middleware';

// Define the type for user data
// type Permission = {
//   _id: string;
//   resource_slug: string;
//   policy_name: string;
// }


type Role = {
  _id: string;
  role_name: string;
  permissions: string[];
  // permissions: Permission[];
  role_description: string;
};

type UserData = {
  _id: string;
  username: string;
  email: string;
  roles: Role[];
};


// Define the state and actions for authentication
type AuthState = {
  isAuthenticated: boolean;
  user: UserData | null;
  login: (userData: UserData) => void;
  logout: () => void;
};

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  login: (userData) => {
    set({ isAuthenticated: true, user: userData });
  },
  logout: () => {
    set({ isAuthenticated: false, user: null })
  },
}));

// Custom hook to check authentication and authorization
export const useAuth = () => {
  const { isAuthenticated, user, login, logout } = useAuthStore();

  const hasPermission = (permission: string) => {
    return isAuthenticated && user?.roles.some((role) => role.permissions.includes(permission));
  };

  return { isAuthenticated, user, login, logout, hasPermission };
};
