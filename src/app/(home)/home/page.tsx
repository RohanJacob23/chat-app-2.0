import { Image, Container, Title, Button, Group, Text } from "@mantine/core";
import NextImage from "next/image";
import classes from "./HeroBullets.module.css";
import FeatureList from "@/components/ui/FeatureList";
import cx from "clsx";

export default function page() {
  return (
    <Container size="md" className="min-h-screen">
      <div className={classes.inner}>
        <div className={classes.content}>
          <Title className={classes.title}>
            A <span className={classes.highlight}>modern</span> React <br />{" "}
            components library
          </Title>
          <Text c="dimmed" mt="md">
            Build fully functional accessible web applications faster than ever
            - Mantine includes more than 120 customizable components and hooks
            to cover you in any situation
          </Text>

          <FeatureList />

          <Group mt={30}>
            <Button
              radius="xl"
              size="md"
              className={cx(classes.control, "max-md:px-2")}
            >
              Get started
            </Button>
            <Button
              variant="default"
              radius="xl"
              size="md"
              className={cx(classes.control, "max-md:px-2")}
            >
              Source code
            </Button>
          </Group>
        </div>
        <Image
          component={NextImage}
          src="/clipart/heroImage.svg"
          width={500}
          height={500}
          alt="Mantine hero image"
          className={classes.image}
        />
      </div>
    </Container>
  );
}
