import { Input } from "@/components/ui/input"
import type { ChatCompletionMessage } from "openai/resources/index.mjs";
import { FormEvent, useState } from "react";
import { api } from "rekommendera/utils/api";

type Chat = {
  text: string | null | undefined;
  by: string;
  timestamp: number;
}

export default function Rekommendera() {
  const [input, setInput] = useState("");
  const [chats, setChats] = useState<Chat[]>([]);

  const askChatgpt = api.chatgpt.askChatgpt.useMutation({ onSuccess: ({ response, created }) => {
    const chatgptResponse = { text: response?.message.content, by: "chatgpt", timestamp: created };
    setChats([...chats, chatgptResponse]);
  }});

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    askChatgpt.mutate({ text: input });
    const userQuestion = { text: input, by: "user", timestamp: Date.now() };
    setChats([...chats, userQuestion]);
    setInput("");
  }

  return (
    <div className="flex flex-grow flex-col items-center gap-4 w-4/6" style={{ maxHeight: "80vh" }}>
      <div className="flex flex-row gap-4">
        <Input
          className="border border-slate-400 rounded-lg w-80 h-10 p-4"
          placeholder="Vad vill du ha rekommenderat idag?"
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button className="border border-slate-400 bg-white rounded-md p-2 hover:bg-slate-200" onClick={handleSubmit}>Rekommendera</button>
      </div>
      <div className="border border-slate-400 w-full flex-grow p-2 bg-white overflow-y-scroll flex flex-col justify-end">
        {chats.map((chat) => <Chat key={chat.timestamp} chat={chat} />)}
      </div>
    </div>
  )
}

function Chat({ chat }: { chat: Chat }) {
  const classList = chat.by == "user" ? "bg-cyan-300 self-end" : "bg-emerald-50";
  return (
    <div className={`${classList} p-2 border border-black w-fit rounded-md mb-2`} style={{maxWidth: "80%"}}>{chat.text}</div>
  )
}