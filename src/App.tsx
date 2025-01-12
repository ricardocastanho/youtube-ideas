import AssistantMessage from "./components/AssistantMessage";
import UserMessage from "./components/UserMessage";

function App() {
  const messages = [
    { role: "user", content: "Isso é uma mensagem" },
    {
      role: "assistant",
      content: "# Bem-vindo ao MarkdownViewer",
    },
  ];

  return (
    <div className="bg-background text-primary h-screen overflow-auto">
      <div className="fixed top-0 max-h-[90%] w-full flex flex-col items-center p-4 pb-[500px] overflow-auto">
        {messages.map((message, i) => {
          if (message.role === "assistant") {
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
        <input
          type="text"
          placeholder="Type your message here"
          className="flex-grow h-[50px] px-4 rounded-l-md bg-secondary text-primary outline-none"
        />
        <button className="h-[50px] w-[50px] bg-primary text-background rounded-full flex items-center justify-center p-2 ml-2">
          🔍
        </button>
      </div>
    </div>
  );
}

export default App;
