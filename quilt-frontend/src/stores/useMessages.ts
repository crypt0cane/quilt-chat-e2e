import create from "zustand";
import { SHA256 } from "crypto-js";
import produce, { enableMapSet } from "immer";

enableMapSet();

export interface MessageType {
  name: string;
  message: string;
  createdAt: number;
}

interface useMessagesStore {
  messages: { [address: string]: MessageType[] };
  storedMessages: Set<string>;
  recieverAddress: string;
  setRecieverAddress: (address: string) => void;
  addMessage: (
    message: MessageType,
    recieverAddress: string | undefined
  ) => void;
}

export const useMessages = create<useMessagesStore>((set, get) => ({
  messages: {},
  storedMessages: new Set(),
  recieverAddress: "",
  setRecieverAddress: (address: string) =>
    set({
      recieverAddress: address,
    }),
  addMessage: (message: MessageType, recieverAddress: string | undefined) => {
    const username = recieverAddress ?? message.name;
    const hashedMessage = SHA256(
      username + message.createdAt.toString()
    ).toString();

    // if message is already stored do not change state
    if (get().storedMessages.has(hashedMessage)) {
      return;
    }

    set(
      produce<useMessagesStore>((state) => {
        if (state.messages[username]) {
          state.messages[username].unshift(message);
          state.messages[username].sort((a, b) => b.createdAt - a.createdAt);
          //newUserMessages = newUserMessages.slice(0, 20);
        } else {
          state.messages[username] = [message];
        }

        state.storedMessages.add(hashedMessage);
      })
    );
  },
}));
