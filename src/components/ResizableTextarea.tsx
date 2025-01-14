import React, { useEffect, useRef } from "react";

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

  useEffect(() => {
    if (!value && textareaRef && textareaRef.current) {
      textareaRef.current.style.height = "56px";
    }
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      value={value}
      placeholder="Type your message here"
      className="flex-grow min-h-14 max-h-28 lg:max-h-52 p-4 rounded-l-md bg-secondary text-primary outline-none overflow-hidden resize-none"
      onInput={handleInput}
      onChange={handleChange}
    />
  );
};

export default ResizableTextarea;
