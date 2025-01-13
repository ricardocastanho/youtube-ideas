import AssistantMessage from "./components/AssistantMessage";
import UserMessage from "./components/UserMessage";
import Icon from "@mdi/react";
import { mdiSendOutline } from "@mdi/js";
import ResizableTextarea from "./components/ResizableTextarea";
import { useState } from "react";

enum MessageRole {
  user,
  assistant,
  system,
}

type Message = {
  role: MessageRole;
  content: string;
};

function App() {
  const [input, setInput] = useState("");

  const messages: Message[] = [
    { role: MessageRole.user, content: "Isso é uma mensagem" },
    {
      role: MessageRole.assistant,
      content: "# Bem-vindo ao MarkdownViewer",
    },
  ];

  return (
    <div className="bg-background text-primary h-screen overflow-auto">
      <div className="fixed top-0 max-h-[90%] w-full flex flex-col items-center p-4 pb-[500px] overflow-auto">
        {messages.map((message, i) => {
          if (message.role === MessageRole.assistant) {
            return (
              <div className="w-[700px] items-start text-start pb-12" key={i}>
                <AssistantMessage content={message.content} />
              </div>
            );
          }

          return (
            <div className="w-[700px] items-start text-start pb-12" key={i}>
              <div className="w-full flex flex-col items-end">
                <UserMessage content={message.content} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex items-center w-[700px] px-4">
        <ResizableTextarea value={input} onChange={setInput} />

        <button className="h-[50px] w-[50px] bg-primary text-background rounded-full flex items-center justify-center p-2 ml-2">
          <Icon path={mdiSendOutline} size={1} />
        </button>
      </div>
    </div>
  );
}

export default App;
