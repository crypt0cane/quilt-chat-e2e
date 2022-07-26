import { useState } from "react";
import { IoSend } from "react-icons/io5";
import { toast } from "react-toastify";

import { useMessages } from "../../stores/useMessages";
import { useUserData } from "../../stores/useUserData";

import { useContracts } from "../../stores/useContracts";
import { useProvider } from "../../stores/useProvider";
import { useMessagingChannel } from "../../hooks/useMessagingChannel";
import { useGunConnection } from "../../stores/useGunConnection";
import { HashLoader } from "react-spinners";
import { MessageItem } from "./MessageItem";

interface ChatProps {
  isGeneratingSharedKey: boolean;
}

export const Chat: React.FC<ChatProps> = ({ isGeneratingSharedKey }) => {
  const [message, setMessage] = useState("");
  const addMessage = useMessages((state) => state.addMessage);
  const recieverAddress = useMessages((state) => state.recieverAddress);
  const messagesStoreUser = useMessages(
    (state) => state.messages[recieverAddress]
  );
  const userAddress = useUserData((state) => state.address);
  const keyStorage = useContracts((state) => state.contract);
  const provider = useProvider((state) => state.provider);
  const gun = useGunConnection((state) => state.gun);
  const user = useGunConnection((state) => state.gunUser);
  const [privateKey, setPrivateKey] = useState<string>();

  useMessagingChannel(recieverAddress);

  const generateKeyPair = async () => {
    try {
      if (!(keyStorage && provider))
        throw new Error("Failed to connect with contract");

      setPrivateKey("privateKey");
      toast.success("Successfully generated a new key");
    } catch (err: any) {
      console.log(err);
      toast.error(err.message);
    }
  };

  // Sending messages
  const saveMessage = () => {
    if (!privateKey)
      return toast.error("Generate a private key before sending the message.");

    if (!(user && user.user)) {
      toast.error("Not logged in");
      return;
    }

    if (!gun) {
      toast.error("Cannot connect with gunDB");
      return;
    }

    const messages = gun.get(recieverAddress);
    const messageData = {
      name: userAddress,
      message: message,
      createdAt: Date.now(),
    };
    messages.set(messageData);
    addMessage(messageData, recieverAddress);
    setMessage("");
  };

  if (!privateKey) {
    return (
      <button
        onClick={() => generateKeyPair()}
        className="bg-gradient-to-bl from-sky-600 to-blue-700 p-4 text-white h-[70px] text-lg w-2/3 block mt-16 rounded-lg"
      >
        Generate new private key
      </button>
    );
  }

  return (
    <div className="w-2/3 border-x border-gray-700 overflow-hidden h-[88vh] relative px-10 flex flex-col">
      <div className="text-base text-gray-400 pt-6">Chatting with:</div>
      <div className="text-2xl font-bold">{recieverAddress}</div>
      {isGeneratingSharedKey ? (
        <div className="mx-auto h-auto mt-28">
          <HashLoader color="white" />
        </div>
      ) : (
        <>
          <div className="mt-4 overflow-y-scroll scrollbar-hide flex flex-col-reverse h-[65vh]">
            {messagesStoreUser?.map((message, index) => (
              <MessageItem
                key={index}
                message={message}
                recieverAddress={recieverAddress}
              />
            ))}
          </div>
          <div className="mt-4 flex flex-row items-stretch absolute bottom-5 w-[90%]">
            <input
              id="message"
              className="p-5 text-gray-200 rounded-2xl h-[70px] flex-1 mr-4 bg-transparent border border-gray-600"
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              placeholder="Write a message..."
              name="message"
              value={message}
            />
            <button
              type="button"
              onClick={() => saveMessage()}
              className="bg-gradient-to-bl from-sky-600 to-blue-700 text-white p-4 rounded-xl w-24 h-[70px] text-lg flex items-center justify-center transition-all hover:border-4 duration-200"
            >
              <IoSend />
            </button>
          </div>
        </>
      )}
    </div>
  );
};
