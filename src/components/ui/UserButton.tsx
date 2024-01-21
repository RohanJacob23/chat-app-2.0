"use client";

import { UnstyledButton, Group, Avatar, Text } from "@mantine/core";

export default function UserButton() {
  return (
    <UnstyledButton className="block w-full">
      <Group>
        <Avatar
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
          radius="xl"
        />

        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500}>
            Harriette Spoonlicker
          </Text>

          <Text c="dimmed" size="xs">
            hspoonlicker@outlook.com
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  );
}
