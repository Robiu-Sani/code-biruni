/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDb from "lib/connectdb";
import ProjectModel from "model/project.model";

// ✅ Params type (IMPORTANT for Next.js 15.5+)
type ParamsType = {
  params: Promise<{
    id: string;
  }>;
};

// ✅ Helper: validate MongoDB ObjectId
const isValidObjectId = (id: string) =>
  mongoose.Types.ObjectId.isValid(id);

/**
 * ---------------------------------------
 * GET: Get single project by ID
 * ---------------------------------------
 */
export async function GET(req: NextRequest, context: ParamsType) {
  const { id } = await context.params;

  try {
    await connectDb();

    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid project ID" },
        { status: 400 }
      );
    }

    const project = await ProjectModel.findOne({
      _id: id,
      isDeleted: false,
    });

    if (!project) {
      return NextResponse.json(
        { success: false, message: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: project,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to fetch project",
      },
      { status: 500 }
    );
  }
}

/**
 * ---------------------------------------
 * PATCH: Update single project by ID
 * ---------------------------------------
 */
export async function PATCH(req: NextRequest, context: ParamsType) {
  const { id } = await context.params;

  try {
    await connectDb();

    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid project ID" },
        { status: 400 }
      );
    }

    const body = await req.json();

    const updatedProject = await ProjectModel.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!updatedProject) {
      return NextResponse.json(
        { success: false, message: "Project not found or already deleted" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Project updated successfully",
      data: updatedProject,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to update project",
      },
      { status: 500 }
    );
  }
}

/**
 * ---------------------------------------
 * DELETE: Soft delete project by ID
 * ---------------------------------------
 */
export async function DELETE(req: NextRequest, context: ParamsType) {
  const { id } = await context.params;

  try {
    await connectDb();

    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid project ID" },
        { status: 400 }
      );
    }

    const deletedProject = await ProjectModel.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { $set: { isDeleted: true } },
      { new: true }
    );

    if (!deletedProject) {
      return NextResponse.json(
        { success: false, message: "Project not found or already deleted" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to delete project",
      },
      { status: 500 }
    );
  }
}
