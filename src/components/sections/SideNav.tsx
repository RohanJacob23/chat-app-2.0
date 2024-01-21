"use client";

import { useState } from "react";
import { Avatar, Container, ScrollArea } from "@mantine/core";
import classes from "@/styles/NavbarSimple.module.css";
import cx from "clsx";
import { useRouter } from "next/navigation";

const data = [
  { link: "", name: "Rohan Jacob", avatar: null },
  { link: "", name: "Jacob", avatar: null },
  { link: "", name: "Jack", avatar: null },
  { link: "", name: "Roo", avatar: null },
  { link: "", name: "Roo", avatar: null },
  { link: "", name: "Roo", avatar: null },
  { link: "", name: "Roo", avatar: null },
  { link: "", name: "Roo", avatar: null },
  { link: "", name: "Roo", avatar: null },
  { link: "", name: "Roo", avatar: null },
  { link: "", name: "Roo", avatar: null },
  { link: "", name: "Roo", avatar: null },
  { link: "", name: "Roo", avatar: null },
  { link: "", name: "Roo", avatar: null },
  { link: "", name: "Roo", avatar: null },
  { link: "", name: "Roo", avatar: null },
  { link: "", name: "Roo", avatar: null },
  { link: "", name: "Roo", avatar: null },
  { link: "", name: "Roo", avatar: null },
  { link: "", name: "Roo", avatar: null },
  { link: "", name: "Roo", avatar: null },
  { link: "", name: "Roo", avatar: null },
  { link: "", name: "Roo", avatar: null },
  { link: "", name: "Roo", avatar: null },
];

export default function SideNav() {
  const [active, setActive] = useState("Billing");
  const router = useRouter();

  const links = data.map((item, i) => (
    <Container
      className={cx(classes.link, "hover:cursor-pointer rounded-md")}
      data-active={item.name === active || undefined}
      key={i}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.name);
        router.replace(`?friend=${item.name}`);
      }}
    >
      <Avatar mr="md" src={item.avatar} alt={item.name}>
        {item.name.charAt(0)}
      </Avatar>
      <span>{item.name}</span>
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
