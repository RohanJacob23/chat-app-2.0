import { pusherServer } from "@/lib/pusher";
import { db } from "../../../../db";
import { messages } from "../../../../db/schema";

export const dynamic = "force-dynamic"; // defaults to auto
export async function POST(request: Request) {
  const {
    message,
    senderId,
    receiverId,
    friendId,
  }: {
    message: string;
    senderId: string;
    receiverId: string;
    friendId: string;
  } = await request.json();

  await db.insert(messages).values({ senderId, content: message, receiverId });

  pusherServer.trigger(friendId, "temp-event", {
    message: message,
    senderId,
    receiverId,
  });

  return Response.json({ checking: true });
}
