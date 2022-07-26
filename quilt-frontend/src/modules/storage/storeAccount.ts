const PRIVATE_KEY = "privatekey";
const USERNAME_KEY = "username";

export const storeUsername = (username: string) => {
  localStorage.setItem(USERNAME_KEY, username);
};
export const readUsername = () => {
  return localStorage.getItem(USERNAME_KEY);
};

export const storePrivateKey = (privateKey: string) => {
  localStorage.setItem(PRIVATE_KEY, privateKey);
};
export const readPrivateKey = () => {
  return localStorage.getItem(PRIVATE_KEY);
};
