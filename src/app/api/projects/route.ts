import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/app/utils/supabase/client";

export async function POST(req: NextRequest) {
  try {
    const { project, userId } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { message: "You must be logged in to publish a project." },
        { status: 401 }
      );
    }

    const { error } = await supabase.from("projects").insert([
      {
        id: userId,
        title: project.title,
        description: project.description,
        content: project.content,
        tags: project.tags,
        website_link: project.websiteLink,
        media_url: project.media,
        built_with: project.builtWith,
        open_for_funding: project.openForFunding,
        funding_goal: project.fundingGoal,
        looking_for: [project.lookingFor],
        funding_pitch: project.fundingPitch,
        likes: project.likes,
        name: project.name,
        pfp: project.pfp,
      },
    ]);

    if (error) {
      return NextResponse.json(
        { message: "Failed to publish project.", error },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Project published successfully!" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "An error occurred.", error: err },
      { status: 500 }
    );
  }
}
