"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import LogoutButton from './LogoutButton';
import { useUser } from "@clerk/nextjs";
import { SignIn } from "@clerk/nextjs";

const Header = () => {
  const session = true;
  const { user } = useUser();
  const User = user?.imageUrl || ""
  
  if(user)return (
    <header className='sticky top-0 z-50 bg-white flex justify-between items-center p-10 shadow-sm'>
        <div className="flex space-x-2">
          <Image className='rounded-full' src={User} alt='Profile Picture' height={10} width={50}/>
        
        <div className="">
          <p className="text-blue-400">Logged in as:</p>
          <p className="font-bold text-lg">{user.fullName}</p>
        </div>
      </div>
      <LogoutButton />
    </header>
  )

  return (
    <header className='sticky top-0 z-50 bg-white flex justify-center items-center p-10 shadow-sm'>
      <div className="flex flex-col items-center space-y-5">
        <div className="flex space-x-2 items-center">
          <Image src={"https://links.papareact.com/jne"} height={10} width={50} alt='Logo' />
          <p className="text-blue-400">Welcome to Meta Messenger</p>
        </div>

        {/* <Link href={'/auth/signin'} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Sign In</Link> */}
        <SignIn />;
      </div>
    </header>
  )
}

export default Header
