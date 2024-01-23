"use client";

import { UnstyledButton, Group, Avatar, Text } from "@mantine/core";

export default function UserButton({
  email,
  name,
  image,
}: {
  email: string;
  name: string;
  image?: string | null;
}) {
  return (
    <UnstyledButton className="block w-full">
      <Group>
        <Avatar src={image} radius="xl" />

        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500}>
            {name}
          </Text>

          <Text c="dimmed" size="xs">
            {email}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  );
}
