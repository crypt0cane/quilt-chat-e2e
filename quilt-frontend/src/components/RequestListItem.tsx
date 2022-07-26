import React, { memo } from "react";
import { IoPersonAdd } from "react-icons/io5";
import { trimEthereumAddress } from "../helpers/trimEthereumAddress";
import { useFriendsList } from "../stores/useFriendsList";

interface RequestListItemProps {
  handleSetFriend: (address: string) => void;
  address: string;
}

export const RequestListItem: React.FC<RequestListItemProps> = memo(
  ({ handleSetFriend, address }) => {
    return (
      <div
        className="w-full rounded-lg h-20 text-white flex flex-row justify-between items-center text-xl my-2 px-4 cursor-pointer hover:scale-95 border border-gray-700"
        onClick={() => handleSetFriend(address)}
      >
        <div className="h-12 w-12 rounded-full bg-slate-800"></div>
        <div className="overflow-hidden">
          {trimEthereumAddress(address, 22)}
        </div>
        <div>
          <button
            onClick={() => {
              useFriendsList.getState().addFriend(address, { username: "" });
            }}
            className="bg-green-600 w-12 h-12 rounded-md font-bold text-sm flex items-center justify-center"
          >
            <IoPersonAdd></IoPersonAdd>
          </button>
        </div>
      </div>
    );
  }
);
