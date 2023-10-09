'use client'
import { Message } from '@/typings';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useUser } from "@clerk/nextjs";
import TimeAgo from "react-timeago";


type Props = {
    message: Message;
};



const MessageComponent = ({ message }: Props) => {
  const { user } = useUser();
  const isCurrentUser = user?.emailAddresses[0].emailAddress === message.email;
  const mess = message.profilePic;
  console.log(mess, "mess");
  const userImage = isCurrentUser ? user?.imageUrl : mess;
    
  

    return (
      <div className={`flex w-full ${isCurrentUser ? "justify-end" : ""}`}>
        <div className={`flex-shrink-0 ${isCurrentUser ? "order-2" : ""}`}>
            <Image
            className='rounded-full mx-2'
            height={50}
            width={50}
            alt='Profile Picture'
            src={userImage}
            />
        </div>

        <div className=''>
            <p className={`text-[0.65rem] px-[2px] pb-[2px] ${isCurrentUser ? "text-blue-400 text-right" : "text-red-400 text-left"}`}>{message.username}</p>

            <div className='flex items-end'>
            <div className={`px-3 py-2 rounded-lg w-fit text-white ${isCurrentUser ? "bg-blue-400 ml-auto order-2" : "bg-red-400"}`}>
                <p className=''>{message.message}</p>
            </div>

            <p className={`text-[0.65rem] italic px-2 text-gray-30 ${isCurrentUser ? "text-right" : ""}`}>
                <TimeAgo date={new Date(message.created_at)} />
            </p>
            </div>
        </div>
      </div>
    );
};

export default MessageComponent;
