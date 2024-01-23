"use client";

import { Image, Title, Text, Button, SimpleGrid } from "@mantine/core";
import NextImage from "next/image";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <SimpleGrid
      spacing={{ base: 40, sm: 80 }}
      cols={{ base: 1, sm: 2 }}
      mih="100vh"
      p={{ base: 30, sm: 50 }}
      className="place-items-center"
    >
      <div className="space-y-4">
        <Title className="md:text-6xl">Something is not right...</Title>
        <Text c="dimmed" size="lg">
          Page you are trying to open does not exist. You may have mistyped the
          address, or the page has been moved to another URL. If you think this
          is an error contact support.
        </Text>
        <Button
          variant="light"
          size="md"
          mt="xl"
          onClick={() => router.push("/")}
        >
          Get back to home page
        </Button>
      </div>
      <Image
        component={NextImage}
        radius="md"
        fit="contain"
        width={500}
        height={500}
        className="w-44 h-44 md:w-full md:h-full max-h-96 max-w-96 order-first md:order-none"
        alt="Mantine error page"
        src="/clipart/pageNotFound.svg"
      />
    </SimpleGrid>
  );
}
