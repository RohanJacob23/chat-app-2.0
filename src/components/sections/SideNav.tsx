"use client";

import { useState } from "react";
import { Avatar, Container, ScrollArea } from "@mantine/core";
import classes from "@/styles/NavbarSimple.module.css";
import cx from "clsx";
import { useRouter } from "next/navigation";
import { FriendList } from "@/type/type";

export default function SideNav({
  toggle,
  friendList,
}: {
  toggle: () => void;
  friendList: FriendList[];
}) {
  const [active, setActive] = useState<string | null>(null);
  const router = useRouter();

  const links = friendList.map(({ user }, i) => (
    <Container
      className={cx(classes.link, "hover:cursor-pointer rounded-md")}
      data-active={user.name === active || undefined}
      key={user.id}
      onClick={(event) => {
        event.preventDefault();
        toggle();
        setActive(user.name);
        router.replace(`/${user.id}?name=${user.name}`);
      }}
    >
      {/* <Avatar mr="md" src={user.image} alt={user.name!}> */}
      <Avatar mr="md" src={user.image} alt={user.name!}>
        {user.name!.charAt(0)}
      </Avatar>
      <span>{user.name}</span>
    </Container>
  ));

  return (
    <nav className="flex flex-col h-full gap-4">
      <ScrollArea scrollbarSize={4} className="flex-1">
        {links}
      </ScrollArea>
    </nav>
  );
}
