const STORAGE_KEY = 'eventup_user_logged';

export const login = (userData) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
};

export const logout = () => {
  localStorage.removeItem(STORAGE_KEY);
};

export const isLogged = () => {
  const user = localStorage.getItem(STORAGE_KEY);
  return !!user;
};

export const getLoggedUser = () => {
  const user = localStorage.getItem(STORAGE_KEY);
  return user ? JSON.parse(user) : null;
};