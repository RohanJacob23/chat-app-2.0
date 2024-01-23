"use client";

import { Button } from "@mantine/core";
import React from "react";
import cx from "clsx";
import { useRouter } from "next/navigation";

export default function SignInButton({ style }: { style: string }) {
  const router = useRouter();
  return (
    <Button
      radius="xl"
      size="md"
      mt={30}
      onClick={() => router.push("/auth")}
      className={cx(style, "max-md:px-2 w-full md:w-auto")}
    >
      Get started
    </Button>
  );
}
