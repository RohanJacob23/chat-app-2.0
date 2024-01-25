import { Message, User } from "@/type/type";
import { Avatar, Flex, Text } from "@mantine/core";
import { User as NextAuthUser } from "next-auth";
import React from "react";
import cx from "clsx";

export default function ChatSection({
  messages,
  friend,
  user,
}: {
  messages: Message[];
  friend: User;
  user?: NextAuthUser;
}) {
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
    </>
  );
}
