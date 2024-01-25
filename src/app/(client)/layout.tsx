import { authOptions } from "@/authOptions";
import AppLayout from "@/components/sections/AppLayout";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { db } from "../../../db";
import { friend, friendRequest, messages, users } from "../../../db/schema";
import { and, eq, not, or } from "drizzle-orm";

const DATABASE_URL = process.env.DRIZZLE_DATABASE_URL;

export default async function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/home");

  const friendRequests = await db
    .select()
    .from(friendRequest)
    .where(eq(friendRequest.receiverId, session.user.id!))
    .innerJoin(users, eq(friendRequest.senderId, users.id));

  const friendList = await db
    .select()
    .from(friend)
    .where(
      or(
        eq(friend.userId1, session.user.id!),
        eq(friend.userId2, session.user.id!)
      )
    )
    .innerJoin(
      users,
      and(
        or(eq(friend.userId1, users.id), eq(friend.userId2, users.id)),
        not(eq(users.id, session.user.id!))
      )
    );

  return (
    <AppLayout
      DATABASE_URL={DATABASE_URL}
      friendRequests={friendRequests}
      session={session}
      friendList={friendList}
    >
      {children}
    </AppLayout>
  );
}
