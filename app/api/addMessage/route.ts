import { serverPusher } from "@/pusher";
import redis from "@/redis";
import { Message } from "@/typings";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

type Data = {
    message: Message;
  };
  
  type ErrorData = {
    body: string;
  };

  export  async function POST(
    req: Request 
  ) {
    try {

      if (req.method !== "POST") {
        return new NextResponse("Method not allowed", { status: 405 });
      }
      const { userId } = auth();
      
      if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
      const body = await req.json();
      const { message } = body;
  
    const newMessage = {
      ...message,
      created_at: Date.now(),
    };
  
    // push to upstash redis
    await redis.hset("messages", message.id, JSON.stringify(newMessage));

    serverPusher.trigger('messages', 'new-message', newMessage)

    return NextResponse.json({ message: newMessage });
    } catch (error) {
      console.log("[Add_Message_ERROR]",error);
      return new NextResponse("Internal Error", { status: 500 });
    }
    
  }

