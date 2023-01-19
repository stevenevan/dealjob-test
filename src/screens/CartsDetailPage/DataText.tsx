import { Grid, Flex, Space, Text } from "@mantine/core";
import type { ReactNode } from "react";

type iProps = {
  title: string;
  content: ReactNode;
};

const DataText = ({ title, content }: iProps) => {
  return (
    <Grid.Col sm={12} md={6}>
      <Flex align={"center"}>
        <Text weight={500} size="lg">
          {title}:
        </Text>
        <Space w="md" />
        <Text color="dimmed" size="md">
          {content}
        </Text>
      </Flex>
    </Grid.Col>
  );
};

export default DataText;
