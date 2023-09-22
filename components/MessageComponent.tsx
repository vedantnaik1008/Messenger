'use client'
import { Message } from '@/typings';
import Image from 'next/image';
import FaceBookImg from '@/public/271822730_1011830639678654_264574873840404575_n.jpg';
import { useEffect, useState } from 'react';
import { useUser } from "@clerk/nextjs";
import TimeAgo from "react-timeago";


type Props = {
    message: Message;
};



const MessageComponent = ({ message }: Props) => {
//   const isUser = false;
  const { isLoaded, isSignedIn, user } = useUser();
  const isUser = user?.emailAddresses[0].emailAddress === message.email
    
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
      setHydrated(true);
  }, []);
  if (!hydrated) {
      // Returns null on first render, so the client and server match
      return null;
  }


    return (
        <div className={`flex w-fit ${user && "ml-auto"}`}>
            <div className={`flex-shrink-0 ${user && "order-2"}`}>
                <Image
                    className='rounded-full mx-2'
                    height={10}
                    width={50}
                    alt='Profile Picture'
                    src={FaceBookImg}/>
            </div>

            <div className=''>
                <p className={`text-[0.65rem] px-[2px] pb-[2px] ${user ? "text-blue-400 text-right" : "text-red-400 text-left"}`}>{message.username}</p>

                <div className='flex items-end'>
                    <div className={`px-3 py-2 rounded-lg w-fit text-white bg-blue-400 ${user ? "bg-blue-400 ml-auto order-2" : "bg-red-400"}`}>
                        <p className=''>{message.message}</p>
                    </div>

                    <p className={`text-[0.65rem] italic px-2 text-gray-30 ${user && "text-right"}`}>
                    <TimeAgo date={new Date(message.created_at)} />

                    </p>
                </div>
            </div>
        </div>
    );
};

export default MessageComponent;
