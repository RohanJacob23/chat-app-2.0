import AppLayout from "@/components/sections/AppLayout";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout>{children}</AppLayout>;
}
