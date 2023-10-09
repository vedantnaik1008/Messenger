import redis from "@/redis";
import { Message } from "@/typings";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


  export  async function GET(
    req: Request 
  ) {
    try {
      if (req.method !== "GET") {
        return new NextResponse("Method not allowed", { status: 405 });
      }
      const { userId } = auth();
      
      if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
      const messagesRes = await redis.hvals("messages")
      const messages: Message[] = messagesRes.map((message) => JSON.parse(message)).sort((a, b) => b.created_at - a.created_at)

      return NextResponse.json({ messages });
    } catch (error) {
      console.log("[Get_Messages_ERROR]",error);
      return new NextResponse("Internal Error", { status: 500 });
    }
    
  }