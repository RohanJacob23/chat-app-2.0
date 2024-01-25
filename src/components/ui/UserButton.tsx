"use client";

import { forwardRef } from "react";
import { UnstyledButton, Group, Avatar, Text } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";

interface UserButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  image?: string | null;
  name: string;
  email: string;
  icon?: React.ReactNode;
}

const UserButton = forwardRef<HTMLButtonElement, UserButtonProps>(
  ({ email, image, name, ...others }: UserButtonProps, ref) => {
    return (
      <UnstyledButton ref={ref} w="100%" {...others}>
        <Group wrap="nowrap">
          <Avatar src={image} radius="xl" />

          <div style={{ flex: 1 }}>
            <Text size="sm" fw={500}>
              {name}
            </Text>

            <Text c="dimmed" size="xs">
              {email}
            </Text>
          </div>

          <IconChevronRight size="1rem" />
        </Group>
      </UnstyledButton>
    );
  }
);

export default UserButton;
