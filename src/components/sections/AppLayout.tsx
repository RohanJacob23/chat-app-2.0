"use client";

import {
  AppShell,
  Burger,
  Divider,
  Group,
  Indicator,
  Menu,
  ScrollArea,
  Title,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import SideNav from "./SideNav";
import {
  IconBrandMantine,
  IconLogout,
  IconUsersGroup,
} from "@tabler/icons-react";
import UserButton from "../ui/UserButton";
import ThemeSwitch from "../ui/ThemeSwitch";
import classes from "@/styles/NavbarSimple.module.css";
import cx from "clsx";
import ChatInput from "../ui/ChatInput";
import FriendTitle from "../ui/FriendTitle";
import { Suspense, useState } from "react";
import { signOut } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import FriendRequestModal from "../ui/FriendRequestModal";
import { FriendRequests, FriendList } from "@/type/type";
import { IconUserPlus } from "@tabler/icons-react";
import SendFriendRequestModal from "../ui/SendFriendRequestModal";

export default function AppLayout({
  children,
  session,
  friendRequests,
  DATABASE_URL,
  friendList,
}: {
  children: React.ReactNode;
  session: Session | null;
  friendRequests: FriendRequests[];
  friendList: FriendList[];
  DATABASE_URL?: string;
}) {
  const [opened, { toggle }] = useDisclosure();
  const [
    friendRequestModal,
    { open: openFriendRequest, close: closeFriendRequest },
  ] = useDisclosure();
  const [
    sendFriendRequestModal,
    { open: openSendFriendRequest, close: closeSendFriendRequest },
  ] = useDisclosure();
  const matches = useMediaQuery("(min-width: 48em)");
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
        <AppShell.Section mb="xs" display="flex" className="items-center gap-2">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Title order={3}>Friends</Title>
        </AppShell.Section>

        <Divider />

        <AppShell.Section grow component={ScrollArea}>
          <SideNav toggle={toggle} friendList={friendList} />
        </AppShell.Section>

        <Divider />

        <AppShell.Section mt={8}>
          <ThemeSwitch />
          <Menu
            withArrow
            arrowPosition="center"
            width={matches ? 200 : "80%"}
            position={matches ? "right-end" : "top"}
          >
            <Menu.Target>
              <UserButton
                className="hover:bg-[var(--mantine-color-gray-2)] dark:hover:bg-[var(--mantine-color-dark-8)] rounded-md p-2"
                email={session?.user.email!}
                name={session?.user.name!}
                image={session?.user.image}
              />
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                onClick={() => openSendFriendRequest()}
                leftSection={<IconUserPlus size={20} stroke={1.5} />}
              >
                Add Friend
              </Menu.Item>
              <Menu.Item
                onClick={() => openFriendRequest()}
                leftSection={
                  <Indicator size={8} disabled={friendRequests.length === 0}>
                    <IconUsersGroup size={20} stroke={1.5} />
                  </Indicator>
                }
              >
                Requests
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item
                color="red"
                onClick={() => {
                  signOut({ callbackUrl: "/auth", redirect: false }).then(
                    ({ url }) => {
                      router.push(url);
                      toast.info("Successfully logged out");
                    }
                  );
                }}
                leftSection={
                  <IconLogout
                    className={cx(
                      classes.linkIcon,
                      "!text-[var(--mantine-color-red-text)]"
                    )}
                    size={20}
                    stroke={1.5}
                  />
                }
              >
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </AppShell.Section>

        {/* friend request modal */}
        <FriendRequestModal
          friendRequests={friendRequests}
          userId={session?.user.id}
          DATABASE_URL={DATABASE_URL}
          opened={friendRequestModal}
          close={closeFriendRequest}
        />
        {/* Send Friend Request Modal */}
        <SendFriendRequestModal
          DATABASE_URL={DATABASE_URL}
          opened={sendFriendRequestModal}
          close={closeSendFriendRequest}
          userId={session?.user.id}
          userEmail={session?.user.email}
        />
      </AppShell.Navbar>

      <AppShell.Main display="flex" w="100%" mah="100vh">
        {children}
      </AppShell.Main>

      <AppShell.Footer
        className="flex flex-row items-center justify-center"
        px={{ sm: "xl", base: "md" }}
      >
        <ChatInput DATABASE_URL={DATABASE_URL} userId={session?.user.id} />
      </AppShell.Footer>
    </AppShell>
  );
}
