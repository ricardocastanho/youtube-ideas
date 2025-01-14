import React, { useEffect, useRef, useState } from "react";

type UserMessageProps = {
  content: string;
};

const UserMessage: React.FC<UserMessageProps> = ({ content }) => {
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [message]);

  useEffect(() => {
    setMessage(content);
  });

  return (
    <div>
      <div className="bg-secondary rounded-full p-4 px-12">
        {message.split("\n").map((word) => (
          <p className="text-white">{word}</p>
        ))}
      </div>
      <div ref={messagesEndRef} />
    </div>
  );
};

export default UserMessage;
