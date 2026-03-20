import { UserData } from "@/types/user";

const STORAGE_KEY = 'eventup_user_logged';

export const login = (userData: UserData) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
};

export const logout = () => {
  localStorage.removeItem(STORAGE_KEY);
};

export const isLogged = () => {
  const user = localStorage.getItem(STORAGE_KEY);
  return !!user;
};

export const getLoggedUser = (): UserData | null => {
  const user = localStorage.getItem(STORAGE_KEY);
  return user ? JSON.parse(user) : null;
};