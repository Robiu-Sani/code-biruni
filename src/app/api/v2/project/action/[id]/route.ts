/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDb from "lib/connectdb";
import ProjectModel from "model/project.model";

// ✅ Helper: validate MongoDB ObjectId
const isValidObjectId = (id: string) => mongoose.Types.ObjectId.isValid(id);

/**
 * ---------------------------------------
 * GET: Get single project by ID
 * ---------------------------------------
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDb();

    const { id } = params;

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
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

/**
 * ---------------------------------------
 * PATCH: Update single project by ID
 * ---------------------------------------
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDb();

    const { id } = params;
    const body = await req.json();

    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid project ID" },
        { status: 400 }
      );
    }

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
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

/**
 * ---------------------------------------
 * DELETE: Soft delete project by ID
 * ---------------------------------------
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDb();

    const { id } = params;

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
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
