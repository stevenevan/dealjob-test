import { USERS_QUERY } from "@endpoints/users";
import {
  ActionIcon,
  Avatar,
  Group,
  HoverCard,
  Loader,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import {
  IconGenderFemale,
  IconGenderMale,
  IconInfoCircle,
} from "@tabler/icons";
import { useQuery } from "@tanstack/react-query";

type iProps = {
  userId: number;
};

const UserHoverCard = ({ userId }: iProps) => {
  const { data, isLoading } = useQuery({ ...USERS_QUERY.getUser(userId) });

  if (isLoading || !data?.data) {
    return (
      <Group>
        <Text>Loading user data</Text>
        <Loader></Loader>
      </Group>
    );
  }
  const { data: user } = data;
  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <Group spacing="xs">
      <Text>{fullName}</Text>
      <HoverCard width={320} shadow="md" withArrow>
        <HoverCard.Target>
          <ActionIcon>
            <IconInfoCircle size={16} />
          </ActionIcon>
        </HoverCard.Target>
        <HoverCard.Dropdown>
          <Group>
            <Avatar size="lg" src={user.image} radius="xl" variant="outline">
              {fullName}
            </Avatar>
            <Stack>
              <Group>
                <Title order={4}>{fullName}</Title>
                {user.gender === "male" ? (
                  <ActionIcon color="blue">
                    <IconGenderMale />
                  </ActionIcon>
                ) : (
                  <ActionIcon color="pink">
                    <IconGenderFemale />
                  </ActionIcon>
                )}
              </Group>
              <Stack spacing={"xs"}>
                <Text fz="sm">{user.email}</Text>
                <Text fz="sm">{user.phone}</Text>
                <Text fz="sm">{user.address.address}</Text>
              </Stack>
            </Stack>
          </Group>
        </HoverCard.Dropdown>
      </HoverCard>
    </Group>
  );
};

export default UserHoverCard;
