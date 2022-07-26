import React, { memo } from "react";
import { MessageType } from "../../stores/useMessages";

interface MessageItemProps {
  message: MessageType;
  recieverAddress: string;
}

export const MessageItem: React.FC<MessageItemProps> = memo(
  ({ message, recieverAddress }) => {
    const formatedMessageData = new Date(message.createdAt).toLocaleString();

    if (message.name === recieverAddress) {
      // received message
      return (
        <div className="flex flex-col items-start mt-2">
          <div className="max-w-[320px] min-w-[40px] bg-gradient-to-bl from-slate-800 to-slate-800 mb-1 mt-3 rounded-3xl rounded-bl-none">
            <div className="text-base px-6 py-3 text-gray-200">
              {message.message}
            </div>
          </div>
          <div className="text-sm text-gray-600">{formatedMessageData}</div>
        </div>
      );
    }

    // sent message
    return (
      <div className="flex flex-col items-end mt-2">
        <div className="max-w-[320px] min-w-[40px] bg-gradient-to-bl from-sky-500 to-blue-600 mb-1 mt-3 rounded-3xl rounded-br-none">
          <div className="text-base px-6 py-3 text-white">
            {message.message}
          </div>
        </div>
        <div className="text-sm text-gray-500">{formatedMessageData}</div>
      </div>
    );
  }
);
