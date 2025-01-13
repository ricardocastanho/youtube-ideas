import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface AssistantMessageProps {
  content: string;
  isAutoScrollEnabled?: boolean;
  typingSpeed?: number; // Velocidade em ms entre cada caractere
}

const AssistantMessage: React.FC<AssistantMessageProps> = ({
  content,
  isAutoScrollEnabled = true,
  typingSpeed = 5,
}) => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentIndex < content.length) {
      const timeout = setTimeout(() => {
        setCurrentText((prevText) => prevText + content[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, typingSpeed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, typingSpeed, content]);

  useEffect(() => {
    if (isAutoScrollEnabled && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentText, currentIndex, isAutoScrollEnabled]);

  return (
    <div className="prose prose-invert overflow-auto h-full">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{currentText}</ReactMarkdown>
      <div ref={messagesEndRef} />
    </div>
  );
};

export default AssistantMessage;
