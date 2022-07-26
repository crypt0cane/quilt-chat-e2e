import React, { memo } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { trimEthereumAddress } from "../helpers/trimEthereumAddress";

interface FriendListItemProps {
  handleSetFriend: (address: string) => void;
  handleRemoveFriend: (address: string) => void;
  address: string;
}

export const FriendListItem: React.FC<FriendListItemProps> = memo(
  ({ handleSetFriend, handleRemoveFriend, address }) => {
    return (
      <div
        className="w-full rounded-lg h-20 text-white flex flex-row justify-between items-center text-xl my-2 px-4 cursor-pointer hover:scale-105 border border-gray-800"
        onClick={() => handleSetFriend(address)}
      >
        <div className="h-12 w-12 rounded-full bg-slate-800"></div>
        <div className="overflow-hidden">
          {trimEthereumAddress(address, 22)}
        </div>
        <div>
          <button
            onClick={() => handleRemoveFriend(address)}
            className="bg-red-500 w-12 h-12 rounded-md font-bold text-sm flex items-center justify-center"
          >
            <FaRegTrashAlt></FaRegTrashAlt>
          </button>
        </div>
      </div>
    );
  }
);
