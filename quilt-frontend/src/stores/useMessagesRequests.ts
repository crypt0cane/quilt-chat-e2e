import produce, { enableMapSet } from "immer";
import create from "zustand";

enableMapSet();

interface useMessagesRequestsStore {
  requestList: Set<string>;
  addRequest: (address: string) => void;
}

export const useMessagesRequests = create<useMessagesRequestsStore>(
  (set, get) => ({
    requestList: new Set(),
    addRequest: (address: string) => {
      if (get().requestList.has(address)) {
        return;
      }

      set(
        produce<useMessagesRequestsStore>((state) => {
          state.requestList.add(address);
        })
      );
    },
  })
);
