import {
  Row,
  Card,
  Text,
  Avatar,
  Column,
  Line,
  Flex,
  SmartImage,
} from "@/once-ui/components";
import { Lexend } from "next/font/google";

const lexend = Lexend({
  variable: "--font-primary",
  subsets: ["latin"],
  display: "swap",
});
type SourcefulCardProps = {
  avatarSrc: string;
  name: string;
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  likes: number;
};

export function SourcefulCard({
  avatarSrc,
  name,
  imageSrc,
  imageAlt,
  title,
  description,
  likes,
}: SourcefulCardProps) {
  return (
    <Row maxWidth={24} maxHeight={32}>
      <Card radius="l-4" direction="column" border="neutral-alpha-medium">
        <Row fillWidth paddingX="20" paddingY="12" gap="8" vertical="center">
          <Avatar size="s" src={avatarSrc} />
          <Text variant="label-default-s" className={lexend.className}>
            {name}
          </Text>
        </Row>
        <SmartImage
          border="neutral-alpha-weak"
          sizes="400px"
          fillWidth
          aspectRatio="4 / 3"
          radius="l"
          alt={imageAlt}
          src={imageSrc}
        />
        <Column fillWidth paddingX="20" paddingY="24" gap="8">
          <Text variant="body-default-xl" className={lexend.className}>
            {title}
          </Text>
          <Text onBackground="neutral-weak" variant="body-default-s">
            {description}
          </Text>
        </Column>
        <Line background="neutral-alpha-medium" />
        <Row
          paddingX="20"
          paddingY="12"
          gap="12"
          vertical="center"
          textVariant="label-default-s"
          onBackground="neutral-medium"
        >
          <Flex gap="4">
            <i className="ri-heart-line"></i>
            {likes}
          </Flex>
        </Row>
      </Card>
    </Row>
  );
}
