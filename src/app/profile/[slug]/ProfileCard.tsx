import {
  Column,
  Input,
  Row,
  SmartImage,
  Text,
  Textarea,
  TagInput,
  Switch,
  NumberInput,
  Select,
  Button,
} from "@/once-ui/components";
import supabase from "services/supabase";
import { useEffect, useState } from "react";
export default function ProfileCard() {
  const [username, setUsername] = useState<string | null>(null);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError) {
        console.error("Error fetching user:", userError);
        setUsername("Guest");
        setProfilePicture(null);
        return;
      }

      const { data, error } = await supabase
        .from("user_info")
        .select("username, profile_picture")
        .eq("id", user?.id)
        .single();

      if (error) {
        console.error("Error fetching user info:", error);
        return;
      }

      setUsername(data?.username || null);
      setProfilePicture(data?.profile_picture || null);
    };

    fetchUserInfo();
  }, []);

  const [firstName, setFirstName] = useState<string>();

  useEffect(() => {
    if (username) {
      const extractedFirstName = username.split(" ")[0];
      setFirstName(extractedFirstName);
    }
  }, [username]);
  const [lastName, setLastName] = useState<string>("");
  useEffect(() => {
    if (username) {
      const nameParts = username.split(" ");
      setLastName(nameParts.length > 1 ? nameParts[nameParts.length - 1] : "");
    }
  }, [username]);
  const [intro, setIntro] = useState<string>("");
  const [interests, setInterests] = useState<string[]>([
    "Design systems",

    "UI / UX"
  ]);
  const [website, setWebsite] = useState<string>("");
  const [githubUsername, setGithubUsername] = useState<string>("");
  const [onlineStatus, setOnlineStatus] = useState<boolean>(false);
  const [totalPins, setTotalPins] = useState<number>(0);
  const [featuredPin, setFeaturedPin] = useState<string>("");
  const [featuredPinOptions, setFeaturedPinOptions] = useState([
    {
      description: "Description for option 1",
      label: "Option 1",
      value: "option1",
    },
    {
      description: "Description for option 2",
      label: "Option 2",
      value: "option2",
    },
    {
      description: "Description for option 3",
      label: "Option 3",
      value: "option3",
    },
  ]);

  return (
    <Column
      radius="xl"
      marginTop="40"
      border="neutral-medium"
      fillWidth
      maxWidth={35}
      fillHeight
      padding="20"
      horizontal="center"
      gap="12"
    >
      <Column gap="8" marginBottom="12" horizontal="center" vertical="center">
        <Column
          horizontal="center"
          vertical="center"
          width={9}
          height={9}
          border="neutral-medium"
          radius="full"
          borderWidth={2}
          padding="2"
        >
          <SmartImage
            src={profilePicture || ""}
            alt="Image description"
            aspectRatio="1/1"
            radius="full"
            isLoading={!username}
            objectFit="cover"
          />
        </Column>
        <Text
          variant="label-default-xs"
          onBackground="neutral-weak"
          style={{ color: "#999" }}
        >
          @{username?.replace(/\s+/g, "").toLowerCase()}
        </Text>
      </Column>

      <Column fillWidth>
        <Input
          id="first-name"
          label="First name"
          value={firstName}
          labelAsPlaceholder={false}
          style={{ borderRadius: "0px !important" }}
          error={false}
          radius="top"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <Input
          id="last-name"
          error={false}
          label="Last name"
          value={lastName}
          labelAsPlaceholder={false}
          style={{ borderRadius: "0px !important" }}
          radius="bottom"
          onChange={(e) => setLastName(e.target.value)}
        />
      </Column>
      <Column fillWidth>
        <Textarea
          id="intro"
          label="Intro"
          lines={7}
          description=""
          labelAsPlaceholder={false}
          resize="vertical"
          value={intro}
          onChange={(e) => setIntro(e.target.value)}
        />
      </Column>
      <Column fillWidth>
        <TagInput
          id="interests"
          value={interests}
          onChange={setInterests}
          label="Interests"
        />
      </Column>
      <Column fillWidth>
        <Input
          id="website"
          label="Website"
          value={website}
          labelAsPlaceholder={false}
          style={{ borderRadius: "0px !important" }}
          error={false}
          radius="top"
          onChange={(e) => setWebsite(e.target.value)}
        />
        <Input
          id="github-username"
          error={false}
          label="Github username"
          value={githubUsername}
          labelAsPlaceholder={false}
          style={{ borderRadius: "0px !important" }}
          radius="bottom"
          onChange={(e) => setGithubUsername(e.target.value)}
        />
      </Column>
      <Column fillWidth paddingLeft="4" paddingTop="4" paddingBottom="4">
        <Switch
          reverse={false}
          label="Online status"
          description="Show your online status to other users"
          isChecked={onlineStatus}
          onToggle={() => setOnlineStatus(!onlineStatus)}
          iconButtonProps={{
            onClick: () => {},
            tooltip: "This is a beta feature",
            tooltipPosition: "top",
          }}
        />
      </Column>
      <Column fillWidth>
        <NumberInput
          id="total-pins"
          error={false}
          label="Total pins"
          value={totalPins}
          labelAsPlaceholder={false}
          style={{ borderRadius: "0px !important" }}
          radius="top"
          onChange={(value) => setTotalPins(value)}
        />
        <Select
          id="featured-pin"
          label="Featured pin"
          options={featuredPinOptions}
          value={featuredPin}
          searchable={true}
          onSelect={(value) => setFeaturedPin(value)}
          radius="bottom"
        />
      </Column>
      <Row fillWidth marginTop="32" horizontal="center" gap="12">
        <Button
          variant="primary"
          size="l"
          fillWidth
          style={{ height: "54px", borderRadius: "17px", maxWidth: "100%" }}
        >
          Save
        </Button>
        <Button
          variant="primary"
          size="l"
          fillWidth
          style={{
            height: "54px",
            borderRadius: "17px",
            maxWidth: "100%",
            color: "#d32f2f", // darker red for contrast
            border: "1px solid #f57373", // same color as text
            backgroundColor: "#FFCDD2", // pastel red background
          }}
          onMouseEnter={(e: any) => {
            e.currentTarget.style.backgroundColor = "#FFbfc2"; // darker red
          }}
          onMouseLeave={(e: any) => {
            e.currentTarget.style.backgroundColor = "#FFCDD2"; // pastel red
          }}
        >
          Delete account
        </Button>
      </Row>
    </Column>
  );
}
