import type { ReactNode } from "react";
import { IconBooks, IconShoppingCart } from "@tabler/icons";
import {
  ThemeIcon,
  UnstyledButton,
  Group,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useRouter } from "next/router";

interface MainLinkProps {
  icon: ReactNode;
  color: string;
  label: string;
  navLink: string;
}

function MainLink({ icon, color, label, navLink }: MainLinkProps) {
  const theme = useMantineTheme();
  const router = useRouter();
  const handleClick = () => {
    void router.push(navLink);
  };

  const isSelected = router.pathname === navLink;
  const backgroundColor: string = isSelected
    ? theme.colorScheme === "dark"
      ? theme.colors.dark[7]
      : theme.colors.gray[1]
    : "inherit";

  return (
    <UnstyledButton
      sx={{
        display: "block",
        width: "100%",
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color:
          theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
        backgroundColor,
        "&:hover": {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
        },
      }}
      onClick={handleClick}
    >
      <Group>
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>

        <Text size="sm">{label}</Text>
      </Group>
    </UnstyledButton>
  );
}

const data = [
  {
    icon: <IconBooks size={16} />,
    color: "blue",
    label: "Products",
    navLink: "/products",
  },
  {
    icon: <IconShoppingCart size={16} />,
    color: "teal",
    label: "Carts",
    navLink: "/carts",
  },
];

export function MainLinks() {
  const links = data.map((link) => <MainLink {...link} key={link.label} />);
  return <div>{links}</div>;
}
