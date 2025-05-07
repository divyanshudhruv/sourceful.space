import React from "react";
import {
  Row,
  Column,
  Text,
  Button,
  Tag,
  SmartImage,
} from "@/once-ui/components";
import "./TopPin.css"; // Import the CSS file for styles
import { createClient } from "@supabase/supabase-js";
import supabase from "services/supabase";
import { useState, useEffect } from "react";
export default function Pin() {
  async function fetchProjects() {
    try {
      const { data, error } = await supabase
        .from("projects")
        .select(
          "project_id, title, description, blob_image_url, open_for_funding, default_tags"
        )
        .limit(10); // Fetch top 10 projects

      if (error) {
        console.error("Error fetching projects:", error);
        return [];
      }

      return data || [];
    } catch (err) {
      console.error("Unexpected error:", err);
      return [];
    }
  }

  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    fetchProjects().then((projects) => {
      console.log("Fetched projects:", projects);
      setProjects(projects);
    });

    const channel = supabase.realtime.channel("projects")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "projects" },
        (payload: { new: any }) => {
          console.log("New project added:", payload.new);
          setProjects((prevProjects) => [payload.new, ...prevProjects]);
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "projects" },
        (payload: { new: any }) => {
          console.log("Project updated:", payload.new);
          setProjects((prevProjects) =>
            prevProjects.map((project) =>
              project.project_id === payload.new.project_id ? payload.new : project
            )
          );
        }
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "projects" },
        (payload: { old: any }) => {
          console.log("Project deleted:", payload.old);
          setProjects((prevProjects) =>
            prevProjects.filter(
              (project) => project.project_id !== payload.old.project_id
            )
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div>
      {projects.map((project, index) => (
        <PinCard
          key={index}
          imageSrc={project.blob_image_url || "null"}
          imageAlt={project.title || "null"}
          title={project.title || "null"}
          tags={
            project.default_tags
              ? project.default_tags.map((tag: string) => ({ label: tag }))
              : [{ label: "" }]
          }
          description={project.description || ""}
          buttons={[
            { label: "Details", href: `/projects/${project.project_id}` },
          ]}
        />
      ))}
    </div>
  );
}

export function App() {
  return <Pin />;
}

function PinCard({
  imageSrc,
  imageAlt,
  title,
  tags,
  description,
  buttons,
}: any) {
  return (
    <Row
      border="neutral-strong"
      radius="l"
      horizontal="start"
      marginTop="20"
      style={{
        maxWidth: "800px",
        transition: "background-color 0.3s ease, border-color 0.3s ease",
      }}
      className="responsive-row"
      cursor="pointer"
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "#f8f8f8";
        e.currentTarget.style.borderColor = "#bbb";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "transparent";
        e.currentTarget.style.borderColor = "";
      }}
      height={24}
    >
      <Row fillHeight style={{ minWidth: "60%" }} className="responsive-image">
        <SmartImage
          src={imageSrc}
          alt={imageAlt}
          aspectRatio="5/4"
          height={3}
          radius="l"
          isLoading={false}
          objectFit="cover"
          unoptimized={true}
        />
      </Row>
      <Column
        padding="40"
        style={{ maxWidth: "40%" }}
        className="responsive-column"
      >
        <Row
          vertical="center"
          textVariant="body-default-xl"
          height={6}
          width={16}
          gap="2"
        >
          <Text
            style={{
              fontSize: "32px",
              color: "#333",
              display: "inline",
              whiteSpace: "nowrap",
              overflowX: "scroll",
              overflowY: "hidden",
            }}
          >
            {title}
          </Text>
          {tags.map((tag: any, index: number) => (
            <Tag
              key={index}
              variant="neutral"
              size="l"
              label={tag.label}
              marginLeft="4"
            ></Tag>
          ))}
        </Row>
        <Row marginTop="20">
          <Text
            variant="body-default-s"
            onBackground="neutral-weak"
            style={{ fontSize: "14px" }}
          >
            {description}
          </Text>
        </Row>
        <Column
          paddingY="0"
          marginTop="0"
          gap="8"
          vertical="end"
          fillHeight
          textVariant="label-default-s"
          onBackground="neutral-weak"
          horizontal="space-between"
        >
          <Row gap="4" horizontal="center" vertical="center">
            <Button
              variant="secondary"
              radius="none"
              style={{ borderRadius: "8px", color: "#333" }}
              fillWidth
            >
              <Text
                style={{ fontSize: "13px !important" }}
                variant="label-default-s"
                onBackground="neutral-strong"
              >
                Upvote
              </Text>{" "}
            </Button>
            <Button
              fillWidth
              variant="secondary"
              radius="none"
              style={{ borderRadius: "8px", color: "#333" }}
            >
              <Text
                style={{ fontSize: "13px !important" }}
                variant="label-default-s"
                onBackground="neutral-strong"
              >
                Downvote
              </Text>{" "}
            </Button>
          </Row>
          {buttons.map((button: any, index: number) => (
            <Button
              key={index}
              variant="secondary"
              fillWidth
              radius="none"
              style={{ borderRadius: "8px", color: "#333" }}
              href={button.href}
            >
              <Text
                style={{ fontSize: "13px !important" }}
                variant="label-default-s"
                onBackground="neutral-strong"
              >
                {button.label}
              </Text>
            </Button>
          ))}
        </Column>
      </Column>
    </Row>
  );
}
