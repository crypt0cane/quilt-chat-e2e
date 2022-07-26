import { useEffect } from "react";
import { readFriendsList } from "../modules/storage/storeFriendsList";
import { useFriendsList } from "../stores/useFriendsList";

export const useStoredFriendsList = () => {
  const setFriendsList = useFriendsList((state) => state.setFriends);

  useEffect(() => {
    const friendsObject = readFriendsList();
    useFriendsList.getState().setInitialized(true);

    if (!friendsObject || Object.keys(friendsObject).length === 0) return;

    setFriendsList(friendsObject);
  }, [setFriendsList]);
};
