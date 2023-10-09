"use client"
import Image from 'next/image'
import React from 'react'
import LogoutButton from './LogoutButton';
import { useUser } from "@clerk/nextjs";
import { SignIn } from "@clerk/nextjs";

const Header = () => {
  const { user } = useUser();
  const User = user?.imageUrl || ""
  
  if(user)return (
    <header className='sticky top-0 z-50 bg-white flex justify-between items-center p-10 shadow-sm'>
        <div className="flex space-x-2">
        <div className="flex gap-4 items-center">
          <LogoutButton />
          <p className="font-bold text-md">{user.fullName}</p>
        </div>
      </div>
      
    </header>
  )

  return (
    <header className='sticky top-0 z-50 bg-white flex justify-center items-center p-10 shadow-sm'>
      <div className="flex flex-col items-center space-y-5">
        <div className="flex space-x-2 items-center">
          <Image src={"https://links.papareact.com/jne"} height={10} width={50} alt='Logo' />
          <p className="text-blue-400">Welcome to Meta Messenger</p>
        </div>
        <SignIn />
      </div>
    </header>
  )
}

export default Header
