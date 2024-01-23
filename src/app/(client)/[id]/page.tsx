import { Avatar, Flex, ScrollArea, Text } from "@mantine/core";
import React from "react";

export default function page({ params: { id } }: { params: { id: string } }) {
  return (
    <ScrollArea w="100%" offsetScrollbars scrollbarSize={6} type="never">
      <section className="flex flex-col gap-4 w-full">
        <Flex
          direction={"row-reverse"}
          gap={"xs"}
          align={"center"}
          className="self-end"
        >
          <Avatar src={null}>R</Avatar>
          <Text className="bg-[var(--mantine-color-blue-filled)] p-2 px-4 rounded-2xl shadow-md max-w-52 md:max-w-80 text-base">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
            tempora nam quia aliquam, alias aliquid dicta exercitationem
            excepturi rerum eligendi officiis iusto nobis ducimus fugiat
            assumenda nostrum! Aliquid, nihil ipsa.
          </Text>
        </Flex>

        <Flex
          direction={"row"}
          gap={"xs"}
          align={"center"}
          className="self-start"
        >
          <Avatar src={null}>R</Avatar>
          <Text className="bg-[var(--mantine-color-default)] p-2 px-4 rounded-2xl shadow-md max-w-52 md:max-w-80 text-base">
            Hello world
          </Text>
        </Flex>

        <Flex
          direction={"row-reverse"}
          gap={"xs"}
          align={"center"}
          className="self-end"
        >
          <Avatar src={null}>R</Avatar>
          <Text className="bg-[var(--mantine-color-blue-filled)] p-2 px-4 rounded-2xl shadow-md max-w-52 md:max-w-80 text-base">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
            tempora
          </Text>
        </Flex>

        {Array.from({ length: 5 }, (_, i) => (
          <Flex
            key={i}
            direction={"row-reverse"}
            gap={"xs"}
            align={"center"}
            className="self-end"
          >
            <Avatar src={null}>R</Avatar>
            <Text className="bg-[var(--mantine-color-blue-filled)] p-2 px-4 rounded-2xl shadow-md max-w-52 md:max-w-80 text-base">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
              tempora
            </Text>
          </Flex>
        ))}
      </section>
    </ScrollArea>
  );
}
