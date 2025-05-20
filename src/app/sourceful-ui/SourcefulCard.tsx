import {
  Row,
  Card,
  Text,
  Avatar,
  Column,
  Line,
  Flex,
  SmartImage,
  SmartLink,
  useToast,
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
  href: string;
  open_for_funding?: boolean;
  id?: string;
  editable?: boolean;
  project_id?: string;
  user_id?: string;
};

export function SourcefulCard(props: SourcefulCardProps) {
  const { addToast } = useToast();

  const {
    avatarSrc,
    name,
    imageSrc,
    imageAlt,
    title,
    description,
    likes,
    href,
    open_for_funding,
    id,
    editable,
    project_id,
    user_id,
  } = props;

  function openEditDialog() {
    addToast({
      variant: "success",
      message: "Edit dialog opened",
    });
  }

  return (
    <Row maxWidth={24} maxHeight={32} minWidth={24} id={id}>
      <Card
        radius="l-4"
        direction="column"
        border="neutral-alpha-medium"
        minWidth={24}
      >
        <Column onClick={() => window.open(href)} fillHeight fillWidth>
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
            draggable={false}
          />
          <Column fillWidth paddingX="20" paddingY="24" gap="8">
            <Text variant="body-default-xl" className={lexend.className}>
              {title}
            </Text>
            <Row minHeight={4}>
              <Text onBackground="neutral-weak" variant="body-default-s">
                {description}
              </Text>
            </Row>
          </Column>
        </Column>
        {/*  */}
        <Line background="neutral-alpha-medium" />
        {/*  */}
        <Row
          paddingX="20"
          paddingY="12"
          gap="12"
          vertical="center"
          textVariant="label-default-s"
          onBackground="neutral-medium"
          cursor="default"
        >
          <Flex gap="4" cursor="pointer">
            <i className="ri-heart-line"></i>
            <Text className={lexend.className}>{likes}</Text>
          </Flex>

          {open_for_funding && (
            <Flex gap="4" cursor="pointer">
              <i className="ri-bank-card-line"></i>
              <Text className={lexend.className}>OPEN</Text>
            </Flex>
          )}
            {editable && (
            <Flex fillWidth vertical="center" horizontal="end">
              <span
              onClick={e => {
                e.stopPropagation();
                openEditDialog();
              }}
              style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
              tabIndex={0}
              role="button"
              aria-label="Edit"
              onKeyPress={e => {
                if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openEditDialog();
                }
              }}
              >
              <Text variant="label-strong-s" onBackground="neutral-weak">
                Edit <i className="ri-arrow-right-line"></i>
              </Text>
              </span>
            </Flex>
            )}
        </Row>
      </Card>
    </Row>
  );
}
