"use client";

import {
  useMantineColorScheme,
  useComputedColorScheme,
  UnstyledButton,
  Group,
} from "@mantine/core";
import { IconSun, IconMoon } from "@tabler/icons-react";
import cx from "clsx";
import classes from "@/styles/ThemeSwitch.module.css";

export default function ThemeSwitch() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("dark", {
    getInitialValueInEffect: true,
  });

  return (
    <UnstyledButton
      onClick={() =>
        setColorScheme(computedColorScheme === "light" ? "dark" : "light")
      }
      w={"100%"}
      color="default"
      variant="subtle"
      className="rounded-md hover:!bg-[var(--mantine-color-blue-light-hover)] !text-[var(--mantine-color-blue-text)] py-[var(--mantine-spacing-xs)] px-[var(--mantine-spacing-sm)]"
    >
      <Group>
        <IconSun
          className={cx(classes.icon, "dark:block hidden")}
          stroke={1.5}
        />
        <IconMoon
          className={cx(classes.icon, "dark:hidden block")}
          stroke={1.5}
        />
        <span className="dark:hidden block">Dark Mode</span>
        <span className="dark:block hidden">Light Mode</span>
      </Group>
    </UnstyledButton>
  );
}
