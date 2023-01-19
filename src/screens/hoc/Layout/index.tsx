import {
  AppShell,
  Navbar,
  Header,
  Burger,
  MediaQuery,
  Flex,
  useMantineTheme,
} from "@mantine/core";
import type { ReactElement } from "react";
import { MainLinks } from "./MainLinks";
import { User } from "./User";
import { useDisclosure } from "@mantine/hooks";

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
        <Header height={{ base: 50, md: 70 }} p="md">
          <Flex align="center" style={{ height: "100%" }}>
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={handler.toggle}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>
          </Flex>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
};

export default Layout;
