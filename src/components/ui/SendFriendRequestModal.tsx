import { Button, Group, Modal, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { neon } from "@neondatabase/serverless";
import { and, eq, or } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";
import React, { useState } from "react";
import { friendRequest, users } from "../../../db/schema";
import { toast } from "sonner";

export default function SendFriendRequestModal({
  DATABASE_URL,
  userEmail,
  userId,
  opened,
  close,
}: {
  userId?: string;
  userEmail?: string | null;
  opened: boolean;
  close: () => void;
  DATABASE_URL?: string;
}) {
  const form = useForm({
    initialValues: {
      email: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  const sql = neon(DATABASE_URL!);
  const db = drizzle(sql);

  const handleSubmit = async (values: { email: string }) => {
    setIsLoading(true);

    if (values.email === userEmail) {
      toast.error("Cannot send friend request to yourself");
      setIsLoading(false);
      return;
    }

    const [findFriend] = await db
      .select()
      .from(users)
      .where(eq(users.email, values.email));

    if (!findFriend) {
      toast.error("User does not exist", {
        description: "Please enter a valid email",
      });
      setIsLoading(false);
      return;
    }

    const checkIfAlreadySentFriendRequest = await db
      .select()
      .from(friendRequest)
      .where(
        or(
          and(
            eq(friendRequest.receiverId, findFriend.id),
            eq(friendRequest.senderId, userId!)
          ),
          and(
            eq(friendRequest.receiverId, userId!),
            eq(friendRequest.senderId, findFriend.id!)
          )
        )
      );

    if (checkIfAlreadySentFriendRequest.length > 0) {
      toast.info("Friend request already sent");
      setIsLoading(false);
      return;
    }

    try {
      await db
        .insert(friendRequest)
        .values({ senderId: userId!, receiverId: findFriend.id! });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      toast.success("Friend request sent successfully");
      form.reset();
    }
  };

  return (
    <Modal opened={opened} onClose={close} title="Send Friend Request" centered>
      {/* Modal content */}
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Add friend by email"
          placeholder="abcd@example.com"
          {...form.getInputProps("email")}
        />
        <Group justify="flex-end" mt="md">
          <Button
            loading={isLoading}
            loaderProps={{ type: "dots" }}
            type="submit"
          >
            Send
          </Button>
        </Group>
      </form>
    </Modal>
  );
}
