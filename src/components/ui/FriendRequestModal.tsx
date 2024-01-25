import { FriendRequests } from "@/type/type";
import {
  ActionIcon,
  Avatar,
  Group,
  Modal,
  ScrollArea,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { neon } from "@neondatabase/serverless";
import { IconCheck, IconX } from "@tabler/icons-react";
import { drizzle } from "drizzle-orm/neon-http";
import React from "react";
import { friend, friendRequest } from "../../../db/schema";
import { eq, or } from "drizzle-orm";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function FriendRequestModal({
  friendRequests,
  userId,
  DATABASE_URL,
  opened,
  close,
}: {
  DATABASE_URL?: string;
  userId?: string;
  friendRequests: FriendRequests[];
  opened: boolean;
  close: () => void;
}) {
  const matches = useMediaQuery("(min-width: 48em)");
  const router = useRouter();

  const sql = neon(DATABASE_URL!);
  const db = drizzle(sql);

  const acceptFriendRequest = async (id: string) => {
    toast.promise(
      () =>
        db.insert(friend).values({
          userId1: userId!,
          userId2: id,
        }),
      {
        loading: "Accepting friend request",
        success: "Accepted friend request",
        error: "Error accepting friend request",
      }
    );

    await db
      .delete(friendRequest)
      .where(
        or(eq(friendRequest.receiverId, id), eq(friendRequest.senderId, id))
      )
      .finally(() => router.refresh());
  };

  const rejectFriendRequest = (id: string) => {
    toast.promise(
      () =>
        db
          .delete(friendRequest)
          .where(
            or(eq(friendRequest.receiverId, id), eq(friendRequest.senderId, id))
          )
          .finally(() => router.refresh()),
      {
        loading: "Rejecting friend request",
        success: "Rejected friend request",
        error: "Error rejecting friend request",
      }
    );
  };

  return (
    <Modal
      opened={opened}
      onClose={close}
      size="lg"
      fullScreen={!matches}
      radius={matches ? "md" : 0}
      scrollAreaComponent={ScrollArea.Autosize}
      title="Friend Requests"
      centered
    >
      {/* Modal content */}
      {!(friendRequests.length === 0) ? (
        <Table verticalSpacing="md" highlightOnHover>
          <Table.Tbody>
            {/* table row */}
            {/* {Array.from({ length: 5 }, (_, i) => ( */}
            {friendRequests.map(({ user: { id, email, name, image } }) => (
              <Table.Tr key={id}>
                <Table.Td>
                  <Group gap="sm">
                    <Avatar size={40} src={image} radius={40} />
                    <div>
                      <Text fz="sm" fw={500}>
                        {name}
                      </Text>
                      <Text c="dimmed" fz="xs">
                        {email}
                      </Text>
                    </div>
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Group justify="flex-end" gap="xs" wrap="nowrap">
                    <ActionIcon
                      variant="light"
                      color="green"
                      aria-label="accept"
                      onClick={() => acceptFriendRequest(id)}
                    >
                      <IconCheck
                        style={{ width: "70%", height: "70%" }}
                        stroke={1.5}
                      />
                    </ActionIcon>
                    <ActionIcon
                      variant="light"
                      color="red"
                      aria-label="reject"
                      onClick={() => rejectFriendRequest(id)}
                    >
                      <IconX
                        style={{ width: "70%", height: "70%" }}
                        stroke={1.5}
                      />
                    </ActionIcon>
                  </Group>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      ) : (
        <Title order={4}>No Friend Requests</Title>
      )}
    </Modal>
  );
}
