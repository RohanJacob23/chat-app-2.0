"use client";

import { Message, User } from "@/type/type";
import { Avatar, Flex, Text } from "@mantine/core";
import { User as NextAuthUser } from "next-auth";
import React, { useEffect, useState } from "react";
import cx from "clsx";
import Pusher from "pusher-js";
import { useSearchParams } from "next/navigation";

export default function ChatSection({
  messages,
  friend,
  user,
  API_KEY,
}: {
  messages: Message[];
  friend: User;
  user?: NextAuthUser;
  API_KEY: string;
}) {
  const [newMessages, setNewMessages] = useState<
    { message: string; senderId: string; receiverId: string }[]
  >([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    const pusher = new Pusher(API_KEY, {
      cluster: "ap2",
    });
    const friendId = searchParams.get("friendId");
    const channel = pusher.subscribe(friendId!);

    channel.bind(
      "temp-event",
      (data: { message: string; senderId: string; receiverId: string }) => {
        // console.log(data);
        setNewMessages((prev) => [...prev, data]);
      }
    );

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []);

  return (
    <>
      {messages.map(({ content, id, senderId }) => {
        const check = user?.id === senderId;
        return (
          <Flex
            key={id}
            direction={check ? "row-reverse" : "row"}
            gap={"xs"}
            align={"center"}
            className={cx(check ? "self-end" : "self-start")}
          >
            <Avatar src={check ? user?.image : friend.image}>
              {check ? user?.name![0] : friend.name![0]}
            </Avatar>
            <Text
              className={cx(
                check
                  ? "bg-[var(--mantine-color-blue-filled)]"
                  : "bg-[var(--mantine-color-default)]",
                "p-2 px-4 rounded-2xl shadow-md max-w-40 md:max-w-80 text-base"
              )}
            >
              {content}
            </Text>
          </Flex>
        );
      })}

      {newMessages.map(({ message, senderId }, i) => {
        const check = user?.id === senderId;
        return (
          <Flex
            key={i}
            direction={check ? "row-reverse" : "row"}
            gap={"xs"}
            align={"center"}
            className={cx(check ? "self-end" : "self-start")}
          >
            <Avatar src={check ? user?.image : friend.image}>
              {check ? user?.name![0] : friend.name![0]}
            </Avatar>
            <Text
              className={cx(
                check
                  ? "bg-[var(--mantine-color-blue-filled)]"
                  : "bg-[var(--mantine-color-default)]",
                "p-2 px-4 rounded-2xl shadow-md max-w-40 md:max-w-80 text-base"
              )}
            >
              {message}
            </Text>
          </Flex>
        );
      })}
    </>
  );
}
