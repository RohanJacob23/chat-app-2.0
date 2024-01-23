import { Flex, Text, Title } from "@mantine/core";

export default function Home() {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      className="text-center"
      mx="auto"
      gap="md"
      maw={900}
    >
      <Title>
        A{" "}
        <Text
          component="span"
          variant="gradient"
          gradient={{ from: "blue", to: "cyan" }}
          inherit
        >
          fully featured
        </Text>{" "}
        React components and hooks library
      </Title>

      <Text c="dimmed">
        Build fully functional accessible web applications with ease - Mantine
        includes more than 100 customizable components and hooks to cover you in
        any situation
      </Text>
    </Flex>
  );
}
