"use client";

import { ActionIcon, Textarea } from "@mantine/core";
import { IconSend2 } from "@tabler/icons-react";
import React from "react";

export default function ChatInput() {
  const [chat, setChat] = React.useState("");
  return (
    <Textarea
      placeholder="Message"
      w="100%"
      classNames={{ input: "py-3" }}
      minRows={1}
      maxRows={3}
      autosize
      required
      rightSection={
        <ActionIcon variant="filled" size="lg" mr={20}>
          <IconSend2 style={{ width: "70%", height: "70%" }} stroke={1.5} />
        </ActionIcon>
      }
      value={chat}
      onChange={(event) => setChat(event.currentTarget.value)}
    />
  );
}
