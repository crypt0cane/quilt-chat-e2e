import create from "zustand";
import produce from "immer";

interface FriendDetails {
  username: string;
}

export type FriendsList = { [address: string]: FriendDetails };

interface useFriendsListStore {
  initialized: boolean;
  friends: FriendsList;
  setInitialized: (initialized: boolean) => void;
  addFriend: (address: string, details: FriendDetails) => void;
  removeFriend: (address: string) => void;
  setFriends: (newFriends: FriendsList) => void;
}

export const useFriendsList = create<useFriendsListStore>((set) => ({
  initialized: false,
  friends: {},
  setInitialized: (initialized: boolean) => set({ initialized }),
  addFriend: (address: string, details: FriendDetails) =>
    set(
      produce<useFriendsListStore>((state) => {
        state.friends[address] = details;
      })
    ),
  removeFriend: (address: string) =>
    set(
      produce<useFriendsListStore>((state) => {
        delete state.friends[address];
      })
    ),
  setFriends: (newFriends: FriendsList) => set({ friends: newFriends }),
  setUsername: (address: string, username: string) =>
    set(
      produce<useFriendsListStore>((state) => {
        state.friends[address].username = username;
      })
    ),
}));
