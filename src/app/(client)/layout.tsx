import { authOptions } from "@/authOptions";
import AppLayout from "@/components/sections/AppLayout";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/home");

  return <AppLayout session={session}>{children}</AppLayout>;
}
