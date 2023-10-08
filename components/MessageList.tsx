"use client"
import fetcher from "@/utils/fetchMessages"
import useSWR from "swr"
import MessageComponent from "./MessageComponent"
import { Message } from "@/typings"
import { useEffect } from "react"
import { clientPusher } from "@/pusher"

type Props = {
  initialMessages: Message[]
}

const MessageList = ({initialMessages}: Props) => {
  const {data: messages, error, mutate} = useSWR<Message[]>("/api/getMessages", fetcher)

  useEffect(() => {
    const channel = clientPusher.subscribe('messages')

    channel.bind('new-message', async (data: Message) => {
      // Refetch the messages after new message
      if(messages?.find((message) => message.id === data.id)) return;

    
      

      if(!messages){
        mutate(fetcher) 
      }else{
        mutate(fetcher, {
          optimisticData: [data, ...messages!],
          rollbackOnError: true,
        })
      }
      
    })

    return () => {
      channel.unbind_all(); 
      channel.unsubscribe(); 
    };

  }, [mutate, messages,clientPusher])

  return (
    <div className="space-y-5 px-5 pt-8 pb-32 w-[70%] mx-auto max-auto">
      {(messages || initialMessages).map((message)=> (
        <MessageComponent key={message.id} message={message} />
      ))}
    </div>
  )
}

export default MessageList
