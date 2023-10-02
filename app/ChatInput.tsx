'use client'
import { Message } from "@/typings"
import { FormEvent, useState } from "react"
import {v4 as uuid} from 'uuid'
import  useSWR  from "swr"
import fetcher from "@/utils/fetchMessages"
import { useUser } from "@clerk/nextjs";
import axios from "axios"



const ChatInput = () => {
    const [input, setInput] = useState('')

    const {data: messages, error, mutate} = useSWR("/api/getMessages", fetcher)
    console.log(messages);
    
    const { isLoaded, isSignedIn, user } = useUser();
    const User = user?.imageUrl || ""
    const emailAddress = user?.emailAddresses[0].emailAddress;
    const addMessage = async(e: FormEvent<HTMLFormElement>) => {
        try {
          e.preventDefault();

        if(!input) return;   

        const messageToSend = input;

        setInput('')

        const id = uuid()

        const message: Message = {
            id,
            message: messageToSend,
            created_at: Date.now(),
            username: user?.fullName!,
            profilePic: User,
            email: emailAddress!,
        }

        console.log(user?.emailAddresses);
        
        const uploadMessageToUpstash = async () => {
            try {
                
                const response = await axios.post<Message>('/api/addMessage', {
                  message 
                })
          
                return [response.data.message, ...messages!]
              
            } catch (error) {
                console.error("Error adding message:", error);
            }
        };
        
       await mutate(uploadMessageToUpstash, {
        optimisticData: [message, ...messages!],
        rollbackOnError: true,
       })
        } catch (error) {
          console.error(error) 
        }
    }
    
  return (
    <form onSubmit={addMessage} className='fixed bottom-0 z-50 w-full flex px-10 py-5 space-x-2 border-t border-gray-100 bg-white'>
      <input value={input} onChange={e => setInput(e.target.value)} type='text' placeholder='Enter message here...' className='flex-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent px-5 py-3 disabled:opacity-50 disabled:cursor-not-allowed'/>
      <button disabled={!input} type='submit' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed">Send</button>
    </form>
  )
}

export default ChatInput
