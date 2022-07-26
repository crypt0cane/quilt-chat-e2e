import { GunCredentials } from "../../types/gun/gunCredentials";

const GUN_CREDENTIALS_KEY = "guncredentials";

export const storeGunCredentials = (gunCredentials: GunCredentials) => {
  const serializedObject = JSON.stringify(gunCredentials);

  localStorage.setItem(GUN_CREDENTIALS_KEY, serializedObject);
};
export const readGunCredentials = (): GunCredentials | undefined => {
  const serializedObject = localStorage.getItem(GUN_CREDENTIALS_KEY);
  if (!serializedObject) return;

  return JSON.parse(serializedObject);
};
