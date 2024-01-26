"use client";

import { ActionIcon, Textarea } from "@mantine/core";
import { neon } from "@neondatabase/serverless";
import { IconSend2 } from "@tabler/icons-react";
import { drizzle } from "drizzle-orm/neon-http";
import React from "react";
import { messages } from "../../../db/schema";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

export default function ChatInput({
  DATABASE_URL,
  userId,
}: {
  DATABASE_URL?: string;
  userId?: string;
}) {
  const [chat, setChat] = React.useState("");
  const params = useParams<{ id?: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();

  const sql = neon(DATABASE_URL!);
  const db = drizzle(sql);

  const sendMessage = async () => {
    await axios.post("/api/send_message", {
      message: chat,
      receiverId: params.id!,
      senderId: userId!,
      friendId: searchParams.get("friendId"),
    });
    setChat("");
  };

  return (
    <Textarea
      placeholder="Message"
      w="100%"
      classNames={{ input: "py-3" }}
      minRows={1}
      maxRows={1}
      autosize
      required
      rightSection={
        <ActionIcon
          variant="filled"
          size="lg"
          mr={20}
          onClick={sendMessage}
          disabled={!params.id || chat.length === 0}
        >
          <IconSend2 style={{ width: "70%", height: "70%" }} stroke={1.5} />
        </ActionIcon>
      }
      value={chat}
      onChange={(event) => setChat(event.currentTarget.value)}
    />
  );
}
