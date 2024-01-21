"use client";

import { AppShell, Burger, Divider, Group, ScrollArea } from "@mantine/core";
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

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure();

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
            <UserButton />
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
          <a
            href="#"
            className={cx(
              classes.link,
              "rounded-md hover:!bg-[var(--mantine-color-red-light-hover)] !text-[var(--mantine-color-red-text)]"
            )}
            onClick={(event) => event.preventDefault()}
          >
            <IconLogout
              className={cx(
                classes.linkIcon,
                "!text-[var(--mantine-color-red-text)]"
              )}
              stroke={1.5}
            />
            <span>Logout</span>
          </a>
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>

      <AppShell.Footer
        className="flex flex-row items-center justify-center"
        // py="md"
        px={{ sm: "xl", base: "md" }}
      >
        <ChatInput />
      </AppShell.Footer>
    </AppShell>
  );
}
