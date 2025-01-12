import React from "react";

type UserMessageProps = {
  content: string;
};

const UserMessage: React.FC<UserMessageProps> = ({ content }) => {
  return (
    <div className="bg-secondary rounded-full p-4 px-12">
      <p className="text-white">{content}</p>
    </div>
  );
};

export default UserMessage;
