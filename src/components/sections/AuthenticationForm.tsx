"use client";

import { useToggle, upperFirst, useMediaQuery } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
} from "@mantine/core";
import { GoogleButton } from "@/components/ui/GoogleButton";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { users } from "../../../db/schema";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { useRouter } from "next/navigation";
import { eq } from "drizzle-orm";

export default function AuthenticationForm({
  DATABASE_URL,
}: {
  DATABASE_URL?: string;
}) {
  const matches = useMediaQuery("(min-width: 36em)");
  const [type, toggle] = useToggle(["login", "register"]);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const sql = neon(DATABASE_URL!);
  const db = drizzle(sql);

  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
      terms: false,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 3
          ? "Password should include at least 3 characters"
          : null,
    },
  });

  useEffect(() => {
    form.reset();
  }, [type, form]);

  /**
   * Handles the form submission for registration or sign in.
   *
   * @param {{email: string, name: string, password: string, terms: boolean}} values - The form values
   * @return {void}
   */
  const handleSubmit = async (values: {
    email: string;
    name: string;
    password: string;
    terms: boolean;
  }) => {
    setIsLoading(true);
    if (type === "register") {
      const [checkIfAlreadyUserExists] = await db
        .select()
        .from(users)
        .where(eq(users.email, values.email));
      if (checkIfAlreadyUserExists) {
        toast.error("User already exists", {
          description: "Please login to continue",
        });
        setIsLoading(false);
        toggle();
      } else
        toast.promise(
          async () =>
            await db.insert(users).values({
              // id: uuidv4(),
              email: values.email,
              name: values.name,
              password: values.password,
            }),

          {
            loading: "Creating account...",
            success: (
              <span className="font-semibold">
                Account created!
                <br />
                Please login to continue
              </span>
            ),
            error: "Error Creating Account",
            finally: () => {
              setIsLoading(false);
              toggle();
            },
          }
        );
    } else {
      try {
        const res = await signIn("credentials", {
          email: values.email,
          password: values.password,
          redirect: false,
        });
        if (!res) return;
        if (res.ok) router.push("/");
        else toast.error("Invalid credentials!!");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Paper radius="md" p="xl" withBorder={matches} w="100%">
      <Text size="lg" fw={500}>
        Welcome to Mantine, {type} with
      </Text>

      <Group grow mb="md" mt="md">
        <GoogleButton radius="xl">Google</GoogleButton>
      </Group>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Stack>
          {type === "register" && (
            <TextInput
              label="Name"
              placeholder="Your name"
              value={form.values.name}
              required
              onChange={(event) =>
                form.setFieldValue("name", event.currentTarget.value)
              }
              radius="md"
            />
          )}

          <TextInput
            required
            label="Email"
            placeholder="hello@mantine.dev"
            autoComplete="on"
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue("email", event.currentTarget.value)
            }
            error={form.errors.email && "Invalid email"}
            radius="md"
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) =>
              form.setFieldValue("password", event.currentTarget.value)
            }
            error={
              form.errors.password &&
              "Password should include at least 3 characters"
            }
            radius="md"
          />

          {type === "register" && (
            <Checkbox
              label="I accept terms and conditions"
              checked={form.values.terms}
              required
              onChange={(event) =>
                form.setFieldValue("terms", event.currentTarget.checked)
              }
            />
          )}
        </Stack>

        <Group justify="space-between" gap="xs" mt="xl">
          <Anchor
            component="button"
            type="button"
            c="dimmed"
            onClick={() => toggle()}
            size="xs"
          >
            {type === "register"
              ? "Already have an account? Login"
              : "Don't have an account? Register"}
          </Anchor>
          <Button
            type="submit"
            radius="xl"
            loading={isLoading}
            loaderProps={{ type: "dots" }}
          >
            {upperFirst(type)}
          </Button>
        </Group>
      </form>
    </Paper>
  );
}
