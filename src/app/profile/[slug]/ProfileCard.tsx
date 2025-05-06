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
  useToast,
} from "@/once-ui/components";
import supabase from "services/supabase";
import { useEffect, useState } from "react";
import "./ProfileCard.css";
export default function ProfileCard() {
  const [username, setUsername] = useState<string>("Guest");
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [intro, setIntro] = useState<string>("");
  const [interests, setInterests] = useState<string[]>([]);
  const [website, setWebsite] = useState<string>("");
  const [githubUsername, setGithubUsername] = useState<string>("");
  const [onlineStatus, setOnlineStatus] = useState<boolean>(false);
  const [totalPins, setTotalPins] = useState<number>(0);
  const [featuredPin, setFeaturedPin] = useState<string>("");
  const [featuredPinOptions, setFeaturedPinOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [originalUser, setOriginalUser] = useState<boolean>(false);

  const { addToast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const slug = window.location.pathname.split("/").pop();
        const { data: session } = await supabase.auth.getSession();
        const userId = session?.session?.user?.id || null;
        setOriginalUser(slug === userId);

        const { data: profileData, error } = await supabase
          .from("user_profile")
          .select("*")
          .eq("id", slug)
          .single();

        if (error) throw error;

        setUsername(profileData.username || "Guest");
        setProfilePicture(profileData.profile_picture || null);
        setFirstName(profileData.first_name || "");
        setLastName(profileData.last_name || "");
        setIntro(profileData.intro || "");
        setInterests(profileData.interests || []);
        setWebsite(profileData.website || "");
        setGithubUsername(profileData.github_username || "");
        setOnlineStatus(profileData.online_status || false);
        setTotalPins(profileData.total_pins || 0);
        setFeaturedPin(profileData.featured_pin || "");
        setFeaturedPinOptions(profileData.featured_pin_options || []);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchData();
  }, []);

  const saveProfileToSupabase = async () => {
    try {
      const { data: session } = await supabase.auth.getSession();
      const userId = session?.session?.user?.id || null;

      if (!userId) throw new Error("User not authenticated");

      const { error } = await supabase.from("user_profile").upsert({
        id: userId,
        email: session.session?.user?.email || "",
        profile_picture: profilePicture,
        first_name: firstName,
        last_name: lastName,
        intro,
        interests,
        website,
        github_username: githubUsername,
        online_status: onlineStatus,
        total_pins: totalPins,
        featured_pin: featuredPin,
        featured_pin_options: featuredPinOptions,
      });

      if (error) throw error;

      addToast({ variant: "success", message: "Profile updated successfully" });
    } catch (error) {
      console.error("Error saving profile:", error);
      addToast({ variant: "danger", message: "Failed to update profile" });
    }
  };

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
      className="profile-card"
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
      {originalUser && (
        <Row fillWidth marginTop="32" horizontal="center" gap="12">
          <Button
            variant="primary"
            size="l"
            fillWidth
            style={{ height: "54px", borderRadius: "17px", maxWidth: "100%" }}
            onClick={saveProfileToSupabase}
          >
            Save
          </Button>
        </Row>
      )}
    </Column>
  );
}
