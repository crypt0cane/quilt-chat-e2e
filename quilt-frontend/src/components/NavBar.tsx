import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

import { useUserData } from "../stores/useUserData";
import { LoadableButton } from "./base/LoadableButton";

import Logo from "../assets/quilt.png";
import { trimEthereumAddress } from "../helpers/trimEthereumAddress";
import { useWallet } from "../hooks/useWallet";
import { RiLogoutBoxLine } from "react-icons/ri";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = () => {
  const isLogged = useUserData((state) => state.isLogged);
  const address = useUserData((state) => state.address);
  const [isConnecting, connectWallet, disconnectWallet] = useWallet();

  useEffect(() => {
    connectWallet();
  }, [connectWallet]);

  return (
    <div className="h-[11vh] w-full flex flex-row justify-center border-b border-gray-700">
      <div className="w-5/6  flex flex-row justify-between align-middle items-center">
        <NavLink className="logo-button" to="/">
          <img src={Logo} alt="logo" className="w-28" />
        </NavLink>
        <div className="flex flex-row">
          {isLogged ? (
            <>
              <LoadableButton
                isLoading={false}
                description={trimEthereumAddress(address, 16)}
                className="border-2 border-sky-600 p-4 rounded-lg text-white w-60 h-16 m-2 text-xl hover:scale-95 transition-all duration-75"
                navigate="/profile"
              />
              <LoadableButton
                isLoading={false}
                handleClick={disconnectWallet}
                className="bg-gradient-to-bl from-sky-600 to-blue-700 text-white p-4 rounded-lg w-16 h-16 m-2 text-lg mr-4 flex items-center justify-center"
              >
                <RiLogoutBoxLine />
              </LoadableButton>
            </>
          ) : (
            <LoadableButton
              isLoading={isConnecting}
              description="connect wallet"
              handleClick={connectWallet}
              className="bg-gradient-to-bl from-sky-600 to-blue-700 p-4 rounded-lg text-white w-60 h-16 m-2 text-lg mr-4"
            />
          )}
        </div>
      </div>
    </div>
  );
};
