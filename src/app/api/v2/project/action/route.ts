/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import connectDb from "lib/connectdb";
import ProjectModel from "model/project.model";

export async function GET(req: NextRequest) {
  try {
    await connectDb();

    const params = Object.fromEntries(req.nextUrl.searchParams.entries());

    const {
      search,
      isDeleted,
      page = "1",
      limit = "10",
    } = params;

    const pageNumber = Math.max(parseInt(page, 10), 1);
    const limitNumber = Math.max(parseInt(limit, 10), 1);
    const skip = (pageNumber - 1) * limitNumber;

    const query: Record<string, any> = {};

    // 🔒 Escape regex
    const escapeRegex = (text: string) =>
      text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    // 🔍 Search
    if (search) {
      const safeSearch = escapeRegex(search);
      query.$or = [
        { name: { $regex: safeSearch, $options: "i" } },
        { mainDomain: { $regex: safeSearch, $options: "i" } },
        { description: { $regex: safeSearch, $options: "i" } },
      ];
    }

    // 🗑️ Deleted filter (default false)
    query.isDeleted = isDeleted === "true";

    // 📊 Queries
    const [data, total] = await Promise.all([
      ProjectModel.find(query).select('name mainDomain images description')
        .sort({ positionPoient : -1})
        .skip(skip)
        .limit(limitNumber),
      ProjectModel.countDocuments(query),
    ]);

    return NextResponse.json({
      success: true,
      data,
      pagination: {
        total,
        page: pageNumber,
        limit: limitNumber,
        totalPages: Math.ceil(total / limitNumber),
        hasNextPage: pageNumber * limitNumber < total,
        hasPrevPage: pageNumber > 1,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}