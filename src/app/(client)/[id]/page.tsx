import { ScrollArea } from "@mantine/core";
import React from "react";
import { messages, users } from "../../../../db/schema";
import { db } from "../../../../db";
import { and, eq, or } from "drizzle-orm";
import { authOptions } from "@/authOptions";
import { User, getServerSession } from "next-auth";
import ChatSection from "@/components/sections/ChatSection";
import { notFound } from "next/navigation";

export default async function page({
  params: { id },
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);

  const [friend] = await db.select().from(users).where(eq(users.id, id));

  const chats = await db
    .select()
    .from(messages)
    .where(
      and(
        or(eq(messages.senderId, id), eq(messages.receiverId, id)),
        or(
          eq(messages.senderId, session?.user.id!),
          eq(messages.receiverId, session?.user.id!)
        )
      )
    );

  chats.sort((a, b) => a.createdAt!.getTime() - b.createdAt!.getTime());

  if (!friend) return notFound();

  return (
    <ScrollArea w="100%" offsetScrollbars scrollbarSize={6} type="never">
      <section className="flex flex-col gap-4 w-full">
        <ChatSection
          API_KEY={process.env.PUSHER_KEY!}
          messages={chats}
          friend={friend}
          user={session?.user as User}
        />
      </section>
    </ScrollArea>
  );
}
