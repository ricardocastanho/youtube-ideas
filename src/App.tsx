import AssistantMessage from "./components/AssistantMessage";
import UserMessage from "./components/UserMessage";
import Icon from "@mdi/react";
import { mdiContentCopy, mdiLoading, mdiSendOutline } from "@mdi/js";
import ResizableTextarea from "./components/ResizableTextarea";
import { useRef, useState } from "react";
import { extractYouTubeURL } from "./utils/utils";

const MessageRole = {
  user: "user",
  assistant: "assistant",
  system: "system",
};

type Message = {
  role: string;
  content: string;
};

type Body = {
  messages: Message[];
  video_url?: string;
};

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [isAutoScrollEnabled, setIsAutoScrollEnabled] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleUserScroll = () => {
    const scrollTop = containerRef.current?.scrollTop || 0;
    const scrollHeight = containerRef.current?.scrollHeight || 0;
    const clientHeight = containerRef.current?.clientHeight || 0;

    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;

    setIsAutoScrollEnabled(isAtBottom);
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [
      ...messages,
      { role: MessageRole.user, content: input },
    ];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    const body: Body = {
      messages: newMessages,
    };

    const videoUrl = extractYouTubeURL(input);
    if (videoUrl) {
      body.video_url = videoUrl;
    }

    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL + "/completion",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) {
        throw new Error("Erro na requisição.");
      }

      const data = await response.json();

      setMessages([
        ...newMessages,
        { role: MessageRole.assistant, content: data.data.completion },
      ]);
    } catch (error) {
      console.error("Erro ao enviar a mensagem:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background text-primary h-screen">
      <div
        className="fixed top-0 max-h-[90%] w-full flex flex-col items-center p-8 pb-[50px] overflow-auto"
        onScroll={handleUserScroll}
        ref={containerRef}>
        {messages.map((message, i) => {
          if (message.role === MessageRole.assistant) {
            return (
              <div
                className="flex flex-col items-start text-start pb-12 w-full lg:1/2 max-w-2xl"
                key={i}>
                <AssistantMessage
                  content={message.content}
                  isAutoScrollEnabled={isAutoScrollEnabled}
                />
                <div className="relative group">
                  <button
                    onClick={() =>
                      navigator.clipboard.writeText(message.content)
                    }
                    className="p-2 bg-transparent rounded hover:bg-secondary text-sm text-white">
                    <Icon path={mdiContentCopy} size={0.8} />
                  </button>
                  <span className="absolute bottom-full mb-1 px-2 py-1 text-xs text-white bg-secondary rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    Copiar
                  </span>
                </div>
              </div>
            );
          }

          return (
            <div
              className="w-full flex justify-end text-start pb-12 lg:1/2 max-w-2xl"
              key={i}>
              <UserMessage content={message.content} />
            </div>
          );
        })}
      </div>

      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-full lg:w-4/5 max-w-3xl px-8">
        <div className="flex items-center">
          <ResizableTextarea value={input} onChange={setInput} />
          <button
            className={`h-[50px] w-[50px] bg-primary text-background rounded-full flex items-center justify-center p-2 ml-2 ${
              loading ? "cursor-not-allowed" : ""
            }`}
            onClick={handleSendMessage}
            disabled={loading}>
            {loading ? (
              <Icon path={mdiLoading} size={1} className="animate-spin" />
            ) : (
              <Icon path={mdiSendOutline} size={1} />
            )}
          </button>
        </div>

        <p className="text-center text-gray-300 pt-2">
          Youtube Ideas - Ricardo Castanho
        </p>
      </div>
    </div>
  );
}

export default App;
