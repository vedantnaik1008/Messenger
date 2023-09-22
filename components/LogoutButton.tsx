'use client'
import { UserButton } from "@clerk/nextjs"

const LogoutButton = () => {
  return (
   
    <UserButton afterSignOutUrl='/'/>
  )
}

export default LogoutButton
