import {  IconChevronRight } from "@tabler/icons";
import {
  UnstyledButton,
  Group,
  Avatar,
  Text,
  Box,
  useMantineTheme,
} from "@mantine/core";

export function User() {
  const theme = useMantineTheme();

  return (
    <Box
      sx={{
        paddingTop: theme.spacing.sm,
        borderTop: `1px solid ${
          theme.colorScheme === "dark"
            ? theme.colors.dark[4]
            : theme.colors.gray[2]
        }`,
      }}
    >
      <UnstyledButton
        sx={{
          display: "block",
          width: "100%",
          padding: theme.spacing.xs,
          borderRadius: theme.radius.sm,
          color:
            theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

          "&:hover": {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[6]
                : theme.colors.gray[0],
          },
        }}
      >
        <Group>
          <Avatar
            src="https://assets.reedpopcdn.com/how-hollow-knights-community-crafted-gibberish-into-a-real-language-1567781461548.jpg/BROK/thumbnail/1200x1200/quality/100/how-hollow-knights-community-crafted-gibberish-into-a-real-language-1567781461548.jpg"
            radius="xl"
          />
          <Box sx={{ flex: 1 }}>
            <Text size="sm" weight={500}>
              Steven Evan
            </Text>
            <Text color="dimmed" size="xs">
              steven.evan999@gmail.com
            </Text>
          </Box>

          <IconChevronRight size={18} />
        </Group>
      </UnstyledButton>
    </Box>
  );
}
