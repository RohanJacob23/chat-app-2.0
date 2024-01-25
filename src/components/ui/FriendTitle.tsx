import { Title } from "@mantine/core";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function FriendTitle() {
  const searchParams = useSearchParams();

  const friend = searchParams.get("name");
  return (
    <Title order={4}>
      {friend && `${friend.charAt(0).toUpperCase()}${friend.slice(1)}`}
    </Title>
  );
}
