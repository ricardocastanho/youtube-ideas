import React, { useRef } from "react";

interface ResizableTextareaProps {
  value: string;
  onChange: (value: string) => void;
}

const ResizableTextarea: React.FC<ResizableTextareaProps> = ({
  value,
  onChange,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
    handleInput();
  };

  return (
    <textarea
      ref={textareaRef}
      value={value}
      placeholder="Type your message here"
      className="flex-grow min-h-[50px] max-h-[200px] p-4 rounded-l-md bg-secondary text-primary outline-none overflow-hidden resize-none"
      onInput={handleInput}
      onChange={handleChange}
    />
  );
};

export default ResizableTextarea;
