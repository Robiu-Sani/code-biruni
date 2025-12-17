import { NextResponse } from "next/server";
import connectDB from "app/api/db/db";
import User from "app/api/model/user.model";
import { IUser } from "app/api/interace/user.interface";

// GET all users
// GET all users with pagination
export async function GET(req: Request) {
  try {
    await connectDB();

    // Parse query parameters from URL
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "30", 10);
    const skip = (page - 1) * limit;

    // Get total count for pagination info
    const total = await User.countDocuments();

    // Fetch paginated users
    const users = await User.find().skip(skip).limit(limit).lean(); // Use lean() for better performance if you don't need Mongoose documents

    return NextResponse.json({
      success: true,
      data: users,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page * limit < total,
        hasPreviousPage: page > 1,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch users", error },
      { status: 500 }
    );
  }
}
// CREATE a new user
export async function POST(req: Request) {
  try {
    await connectDB();
    const body: IUser = await req.json();
    const newUser = await User.create(body);
    return NextResponse.json({ success: true, data: newUser }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to create user", error },
      { status: 500 }
    );
  }
}

// UPDATE a user by ID (full replace)
export async function PUT(req: Request) {
  try {
    await connectDB();
    const { ids, updates }: { ids: string[]; updates: IUser } =
      await req.json();

    if (!ids || !ids.length) {
      return NextResponse.json(
        { success: false, message: "User IDs are required" },
        { status: 400 }
      );
    }

    const bulkUpdateResult = await User.updateMany(
      { _id: { $in: ids } },
      updates,
    );

    // Fetch the updated users to return them
    const updatedUsers = await User.find({ _id: { $in: ids } });

    return NextResponse.json({
      success: true,
      data: updatedUsers,
      matchedCount: bulkUpdateResult.matchedCount,
      modifiedCount: bulkUpdateResult.modifiedCount,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to update users", error },
      { status: 500 }
    );
  }
}

// PARTIAL UPDATE a user by ID
export async function PATCH(req: Request) {
  try {
    await connectDB();
    const { ids, updates }: { ids: string[]; updates: Partial<IUser> } =
      await req.json();

    if (!ids || !ids.length) {
      return NextResponse.json(
        { success: false, message: "User IDs are required" },
        { status: 400 }
      );
    }

    const bulkUpdateResult = await User.updateMany(
      { _id: { $in: ids } },
      { $set: updates },
    );

    // Fetch the updated users to return them
    const updatedUsers = await User.find({ _id: { $in: ids } });

    return NextResponse.json({
      success: true,
      data: updatedUsers,
      matchedCount: bulkUpdateResult.matchedCount,
      modifiedCount: bulkUpdateResult.modifiedCount,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to patch users", error },
      { status: 500 }
    );
  }
}

// DELETE a user by ID
export async function DELETE(req: Request) {
  try {
    await connectDB();
    const { ids }: { ids: string[] } = await req.json();

    if (!ids || !ids.length) {
      return NextResponse.json(
        { success: false, message: "User IDs are required" },
        { status: 400 }
      );
    }

    const deleteResult = await User.deleteMany({ _id: { $in: ids } });

    return NextResponse.json({
      success: true,
      deletedCount: deleteResult.deletedCount,
      message: `Successfully deleted ${deleteResult.deletedCount} users`,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to delete users", error },
      { status: 500 }
    );
  }
}
