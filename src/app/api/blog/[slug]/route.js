import { Post } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async ({ params }) => {

    const { slug } = params

    try {
        connectToDb();

        const post = await Post.findOne({ slug });
        return NextResponse.json(post);
    } catch (err) {
        console.log(err);
        throw new Error("Failed to fetch post!");
    }
};

export const DELETE = async ({ params }) => {

    const { slug } = params

    try {
        connectToDb();
        await Post.deleteOne({ slug });
        return NextResponse.json();
    } catch (err) {
        console.log(err);
        throw new Error("Failed to delete post!");
    }
};