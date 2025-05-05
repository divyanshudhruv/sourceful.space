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

export default function ProfileCard() {
    const [username, setUsername] = useState<string | null>(null);
    const [profilePicture, setProfilePicture] = useState<string | null>(null);
    const [firstName, setFirstName] = useState<string>();
    const [lastName, setLastName] = useState<string>("");
    const [intro, setIntro] = useState<string>("");
    const [interests, setInterests] = useState<string[]>([
        "Design systems",
        "UI / UX",
    ]);
    const [website, setWebsite] = useState<string>("");
    const [githubUsername, setGithubUsername] = useState<string>("");
    const [onlineStatus, setOnlineStatus] = useState<boolean>(false);
    const [totalPins, setTotalPins] = useState<number>(0);
    const [featuredPin, setFeaturedPin] = useState<string>("");
    const [featuredPinOptions, setFeaturedPinOptions] = useState([
        {
            description: "A simple web app",
            label: "Hellolink",
            value: "option1",
        },
    ]);

    const { addToast } = useToast();

    useEffect(() => {
        fetchUserInfo();
        fetchProfileData();
    }, []);

    useEffect(() => {
        if (username) {
            const nameParts = username.split(" ");
            setFirstName(nameParts[0]);
            setLastName(nameParts.length > 1 ? nameParts[nameParts.length - 1] : "");
        }
    }, [username]);

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

    const fetchProfileData = async () => {
        const {
            data: { user },
            error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) {
            console.error("Error fetching user:", userError);
            return;
        }

        const { data, error } = await supabase
            .from("user_profile")
            .select(
                "first_name, last_name, intro, interests, website, github_username, online_status, total_pins, featured_pin, featured_pin_options"
            )
            .eq("id", user.id)
            .single();

        if (error) {
            console.error("Error fetching profile data:", error);
            return;
        }

        setFirstName(data?.first_name || "");
        setLastName(data?.last_name || "");
        setIntro(data?.intro || "");
        setInterests(data?.interests || []);
        setWebsite(data?.website || "");
        setGithubUsername(data?.github_username || "");
        setOnlineStatus(data?.online_status || false);
        setTotalPins(data?.total_pins || 0);
        setFeaturedPin(data?.featured_pin || "");
    };

    const saveProfileToSupabase = async () => {
        const {
            data: { user },
            error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) {
            console.error("Error fetching user:", userError);
            return;
        }

        const { error: updateError } = await supabase
            .from("user_profile")
            .update({
                first_name: firstName,
                last_name: lastName,
                intro: intro,
                interests: interests,
                website: website,
                github_username: githubUsername,
                online_status: onlineStatus,
                total_pins: totalPins,
                featured_pin: featuredPin,
            })
            .eq("id", user.id);

        if (updateError) {
            console.error("Error updating profile:", updateError);
            return;
        }

        addToast({
            variant: "success",
            message: "Profile updated successfully",
        });
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
                    onClick={saveProfileToSupabase}
                >
                    Save
                </Button>
                {/* <Button
                    variant="primary"
                    size="l"
                    fillWidth
                    style={{
                        height: "54px",
                        borderRadius: "17px",
                        maxWidth: "100%",
                        color: "#d32f2f",
                        border: "1px solid #f57373",
                        backgroundColor: "#FFCDD2",
                    }}
                    onMouseEnter={(e: any) => {
                        e.currentTarget.style.backgroundColor = "#FFbfc2";
                    }}
                    onMouseLeave={(e: any) => {
                        e.currentTarget.style.backgroundColor = "#FFCDD2";
                    }}
                >
                    Delete account
                </Button> */}
            </Row>
        </Column>
    );
}
