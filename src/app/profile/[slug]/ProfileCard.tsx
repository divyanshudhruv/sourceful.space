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
    const [userData, setUserData] = useState({
        username: null as string | null,
        profilePicture: null,
        firstName: "",
        lastName: "",
        intro: "",
        interests: ["Design systems", "UI / UX"],
        website: "",
        githubUsername: "",
        onlineStatus: false,
        totalPins: 0,
        featuredPin: "",
        featuredPinOptions: [
            {
                description: "A simple web app",
                label: "Hellolink",
                value: "option1",
            },
        ],
    });

    const { addToast } = useToast();

    const fetchUserInfo = async () => {
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError) {
            console.error("Error fetching user:", userError);
            setUserData((prev) => ({ ...prev, username: "Guest", profilePicture: null }));
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

        setUserData((prev) => ({
            ...prev,
            username: data?.username || null,
            profilePicture: data?.profile_picture || null,
        }));
    };

    const fetchProfileData = async () => {
        const { data: { user }, error: userError } = await supabase.auth.getUser();
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

        setUserData((prev) => ({
            ...prev,
            firstName: data?.first_name || "",
            lastName: data?.last_name || "",
            intro: data?.intro || "",
            interests: data?.interests || [],
            website: data?.website || "",
            githubUsername: data?.github_username || "",
            onlineStatus: data?.online_status || false,
            totalPins: data?.total_pins || 0,
            featuredPin: data?.featured_pin || "",
        }));
    };

    const saveProfileToSupabase = async () => {
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError || !user) {
            console.error("Error fetching user:", userError);
            return;
        }

        const { error: updateError } = await supabase
            .from("user_profile")
            .update({
                first_name: userData.firstName,
                last_name: userData.lastName,
                intro: userData.intro,
                interests: userData.interests,
                website: userData.website,
                github_username: userData.githubUsername,
                online_status: userData.onlineStatus,
                total_pins: userData.totalPins,
                featured_pin: userData.featuredPin,
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

    useEffect(() => {
        fetchUserInfo();
        fetchProfileData();
    }, []);

    const handleInputChange = (field: string, value: any) => {
        setUserData((prev) => ({ ...prev, [field]: value }));
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
                        src={userData.profilePicture || ""}
                        alt="Image description"
                        aspectRatio="1/1"
                        radius="full"
                        isLoading={!userData.username}
                        objectFit="cover"
                    />
                </Column>
                <Text
                    variant="label-default-xs"
                    onBackground="neutral-weak"
                    style={{ color: "#999" }}
                >
                    @{userData.username?.replace(/\s+/g, "").toLowerCase()}
                </Text>
            </Column>

            <Column fillWidth>
                <Input
                    id="first-name"
                    label="First name"
                    value={userData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                />
                <Input
                    id="last-name"
                    label="Last name"
                    value={userData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                />
            </Column>
            <Column fillWidth>
                <Textarea
                    id="intro"
                    label="Intro"
                    lines={7}
                    value={userData.intro}
                    onChange={(e) => handleInputChange("intro", e.target.value)}
                />
            </Column>
            <Column fillWidth>
                <TagInput
                    id="interests"
                    value={userData.interests}
                    onChange={(value) => handleInputChange("interests", value)}
                    label="Interests"
                />
            </Column>
            <Column fillWidth>
                <Input
                    id="website"
                    label="Website"
                    value={userData.website}
                    onChange={(e) => handleInputChange("website", e.target.value)}
                />
                <Input
                    id="github-username"
                    label="Github username"
                    value={userData.githubUsername}
                    onChange={(e) => handleInputChange("githubUsername", e.target.value)}
                />
            </Column>
            <Column fillWidth paddingLeft="4" paddingTop="4" paddingBottom="4">
                <Switch
                    label="Online status"
                    isChecked={userData.onlineStatus}
                    onToggle={() => handleInputChange("onlineStatus", !userData.onlineStatus)}
                />
            </Column>
            <Column fillWidth>
                <NumberInput
                    id="total-pins"
                    label="Total pins"
                    value={userData.totalPins}
                    onChange={(value) => handleInputChange("totalPins", value)}
                />
                <Select
                    id="featured-pin"
                    label="Featured pin"
                    options={userData.featuredPinOptions}
                    value={userData.featuredPin}
                    onSelect={(value) => handleInputChange("featuredPin", value)}
                />
            </Column>
            <Row fillWidth marginTop="32" horizontal="center" gap="12">
                <Button
                    variant="primary"
                    size="l"
                    fillWidth
                    onClick={saveProfileToSupabase}
                >
                    Save
                </Button>
                <Button
                    variant="primary"
                    size="l"
                    fillWidth
                    style={{
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
                </Button>
            </Row>
        </Column>
    );
}
