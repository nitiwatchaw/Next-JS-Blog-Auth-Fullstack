import { User } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async (request) => {
    try {
        // Connect to the database
        await connectToDb();

        // Use lean() to get plain JavaScript objects instead of Mongoose documents
        const users = await User.find().lean();

    
        if (!users || users.length === 0) {
            throw new Error("No users found!");
        }

    
        return NextResponse.json(users);
    } catch (err) {
        console.error("Error fetching users:", err);
        throw new Error("Failed to fetch users!");
    }
};
