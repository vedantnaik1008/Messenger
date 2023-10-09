import ChatInput from "./ChatInput";
import MessageList from "../components/MessageList";
import { Message } from "@/typings";


export default async function Home() {
  const data = await fetch (`${process.env.APP_URL}/api/getMessages`).then((res) => res.json())

  const messages: Message[] = data ? data.messages : []
  return (
    <main className="">
      <MessageList initialMessages={messages} />
      <ChatInput />
    </main>
  )
}
