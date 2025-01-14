import AssistantMessage from "../components/AssistantMessage";
import UserMessage from "../components/UserMessage";
import Icon from "@mdi/react";
import { mdiContentCopy, mdiLoading, mdiSendOutline } from "@mdi/js";
import ResizableTextarea from "../components/ResizableTextarea";
import { useEffect, useRef, useState } from "react";
import { extractYouTubeURL } from "../utils/utils";
import NavigationDrawer from "../components/NavigationDrawer";
import { useSearchParams } from "react-router-dom";

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

const initialMessage: Message = {
  role: "assistant",
  content:
    "Olá! Bem-vindo ao chat! 😊\n\n" +
    "Você pode me enviar links de vídeos do YouTube para análise, ou se preferir, me fazer uma pergunta sobre qualquer assunto. Estou aqui para ajudar!",
};

function Home() {
  const [searchParams] = useSearchParams();

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [isAutoScrollEnabled, setIsAutoScrollEnabled] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const title = searchParams.get("title");
    const text = searchParams.get("text");
    const url = searchParams.get("url");

    let newInput = [title, text, url].filter(Boolean).join("\n");

    if (newInput) {
      setInput(newInput);
      handleSendMessage(newInput);
    } else {
      setMessages([initialMessage]);
    }
  }, [searchParams]);

  const handleUserScroll = () => {
    const scrollTop = containerRef.current?.scrollTop || 0;
    const scrollHeight = containerRef.current?.scrollHeight || 0;
    const clientHeight = containerRef.current?.clientHeight || 0;

    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;

    setIsAutoScrollEnabled(isAtBottom);
  };

  const newChat = () => {
    setMessages([initialMessage]);
    hideMenu();
  };

  const hideMenu = () => {
    if (isMenuOpen === true) {
      setIsMenuOpen((prevState) => !prevState);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const newMessages = [
      ...messages,
      { role: MessageRole.user, content: content },
    ];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    const body: Body = {
      messages: newMessages,
    };

    const videoUrl = extractYouTubeURL(content);
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
    <div>
      <div>
        <NavigationDrawer
          isMenuOpen={isMenuOpen}
          toggleMenu={toggleMenu}
          onClickNewChat={newChat}
        />
      </div>

      <div className="bg-background text-primary h-screen" onClick={hideMenu}>
        <div
          className="fixed top-0 max-h-[90%] w-full flex flex-col items-center p-8 pb-[50px] mt-12 overflow-auto"
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

        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-full lg:w-4/5 max-w-3xl px-8">
          <div className="flex items-center">
            <ResizableTextarea value={input} onChange={setInput} />
            <button
              className={`h-[50px] w-[50px] bg-primary text-background rounded-full flex items-center justify-center p-2 ml-2 ${
                loading ? "cursor-not-allowed" : ""
              }`}
              onClick={() => handleSendMessage(input)}
              disabled={loading}>
              {loading ? (
                <Icon path={mdiLoading} size={1} className="animate-spin" />
              ) : (
                <Icon path={mdiSendOutline} size={1} />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
