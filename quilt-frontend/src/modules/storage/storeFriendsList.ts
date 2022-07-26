import { FriendsList } from "../../stores/useFriendsList";

const FRIENDS_LIST_KEY = "friendList";

export const storeFriendsList = (friendsList: FriendsList) => {
  const serializedObject = JSON.stringify(friendsList);

  localStorage.setItem(FRIENDS_LIST_KEY, serializedObject);
};
export const readFriendsList = (): FriendsList | undefined => {
  const serializedObject = localStorage.getItem(FRIENDS_LIST_KEY);
  if (!serializedObject) return;

  return JSON.parse(serializedObject);
};
