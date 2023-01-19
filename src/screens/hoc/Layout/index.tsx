import {
  AppShell,
  Navbar,
  Header,
  Burger,
  MediaQuery,
  Flex,
  useMantineTheme,
  Title,
  ActionIcon,
  Group,
} from "@mantine/core";
import type { ReactElement } from "react";
import { MainLinks } from "./MainLinks";
import { User } from "./User";
import { useDisclosure } from "@mantine/hooks";
import { IconBrandGithub } from "@tabler/icons";
import Link from "next/link";
import Head from "next/head";

type iLayoutProps = {
  children: ReactElement;
};

const Layout = ({ children }: iLayoutProps) => {
  const theme = useMantineTheme();
  const [opened, handler] = useDisclosure(false);
  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar
          width={{ base: 300 }}
          p="xs"
          hiddenBreakpoint="sm"
          hidden={!opened}
        >
          <Navbar.Section grow mt="xs">
            <MainLinks />
          </Navbar.Section>
          <Navbar.Section>
            <User />
          </Navbar.Section>
        </Navbar>
      }
      navbarOffsetBreakpoint="sm"
      header={
        <Header height={{ base: 50, md: 70 }} py="md" px="lg">
          <Flex
            align="center"
            justify={"space-between"}
            style={{ height: "100%" }}
          >
            <Group>
              <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                <Burger
                  opened={opened}
                  onClick={handler.toggle}
                  size="sm"
                  color={theme.colors.gray[6]}
                  mr="xl"
                />
              </MediaQuery>
              <Title order={3}>DealJob Test</Title>
            </Group>
            <Link href="https://github.com/stevenevan/dealjob-test" passHref>
              <ActionIcon variant="outline" size="lg">
                <IconBrandGithub />
              </ActionIcon>
            </Link>
          </Flex>
        </Header>
      }
    >
      <Head>
        <title>Dealljob Test</title>
      </Head>
      {children}
    </AppShell>
  );
};

export default Layout;
