"use client";

import {
  AppShell,
  Burger,
  Divider,
  Group,
  ScrollArea,
  UnstyledButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import SideNav from "./SideNav";
import { IconBrandMantine, IconLogout } from "@tabler/icons-react";
import UserButton from "../ui/UserButton";
import ThemeSwitch from "../ui/ThemeSwitch";
import classes from "@/styles/NavbarSimple.module.css";
import cx from "clsx";
import ChatInput from "../ui/ChatInput";
import FriendTitle from "../ui/FriendTitle";
import { Suspense } from "react";
import { signOut } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";

export default function AppLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  const [opened, { toggle }] = useDisclosure();
  const router = useRouter();

  return (
    <AppShell
      layout="alt"
      header={{ height: 60 }}
      footer={{ height: 70 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      w="100%"
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <IconBrandMantine size={30} />
          <Suspense>
            <FriendTitle />
          </Suspense>
        </Group>
      </AppShell.Header>

      {/* navbar */}
      <AppShell.Navbar p="md">
        <AppShell.Section mb={8}>
          <Group wrap="nowrap">
            <UserButton
              email={session?.user.email!}
              name={session?.user.name!}
              image={session?.user.image}
            />
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
          </Group>
        </AppShell.Section>

        <Divider />

        <AppShell.Section grow component={ScrollArea}>
          <SideNav toggle={toggle} />
        </AppShell.Section>

        <Divider />

        <AppShell.Section mt={8}>
          <ThemeSwitch />
          <UnstyledButton
            // href="#"
            className={cx(
              classes.link,
              "w-full rounded-md hover:!bg-[var(--mantine-color-red-light-hover)] !text-[var(--mantine-color-red-text)]"
            )}
            onClick={() => {
              signOut({ callbackUrl: "/auth", redirect: false }).then(
                ({ url }) => {
                  router.push(url);
                  toast.info("Successfully logged out");
                }
              );
            }}
          >
            <IconLogout
              className={cx(
                classes.linkIcon,
                "!text-[var(--mantine-color-red-text)]"
              )}
              stroke={1.5}
            />
            <span>Logout</span>
          </UnstyledButton>
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main display="flex" w="100%" mah="100vh">
        {children}
      </AppShell.Main>

      <AppShell.Footer
        className="flex flex-row items-center justify-center"
        px={{ sm: "xl", base: "md" }}
      >
        <ChatInput />
      </AppShell.Footer>
    </AppShell>
  );
}
