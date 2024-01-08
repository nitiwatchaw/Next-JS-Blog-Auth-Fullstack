import { Post } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    // Connect to the database
    await connectToDb();

    // Use lean() to get plain JavaScript objects instead of Mongoose documents
    const posts = await Post.find().lean();

    if (!posts || posts.length === 0) {
      throw new Error("No posts found!");
    }

    // Return a JSON response
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error("Failed to fetch posts!");
  }
};