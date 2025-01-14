import { mdiLoading, mdiSendOutline } from "@mdi/js";
import Icon from "@mdi/react";
import React from "react";
import ResizableTextarea from "./ResizableTextarea";

type UserMessageInputProps = {
  input: string;
  setInput: (input: string) => void;
  isLoading: boolean;
  onSendMessage: (input: string) => void;
};

const UserMessageInput: React.FC<UserMessageInputProps> = ({
  input,
  setInput,
  isLoading,
  onSendMessage,
}) => {
  return (
    <div className="flex items-center">
      <ResizableTextarea value={input} onChange={setInput} />
      <button
        className={`h-[50px] w-[50px] bg-primary text-background rounded-full flex items-center justify-center p-2 ml-2 ${
          isLoading ? "cursor-not-allowed" : ""
        }`}
        onClick={() => onSendMessage(input)}
        disabled={isLoading}>
        {isLoading ? (
          <Icon path={mdiLoading} size={1} className="animate-spin" />
        ) : (
          <Icon path={mdiSendOutline} size={1} />
        )}
      </button>
    </div>
  );
};

export default UserMessageInput;
