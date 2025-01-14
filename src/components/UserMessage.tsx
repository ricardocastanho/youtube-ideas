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
      <div
        className={`bg-secondary p-4 px-12 ${
          message.split("\n").filter(Boolean).length > 1 || message.length > 30
            ? "rouded-3xl"
            : "rounded-full"
        }`}>
        {message.split("\n").map((word, i) => (
          <p className="text-white" key={i}>
            {word}
          </p>
        ))}
      </div>
      <div ref={messagesEndRef} />
    </div>
  );
};

export default UserMessage;
