/* eslint-disable @typescript-eslint/no-explicit-any */
import connectDb from "lib/connectdb";
import ProjectModel from "model/project.model";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET → Get all projects + search & filter
 * Supports queries like:
 * /api/projects?search=website&isDeleted=false
 */
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
      ProjectModel.find(query)
        .sort({ createdAt: -1 })
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

/**
 * POST → Create a new project
 */
export async function POST(req: Request) {
  try {
    await connectDb();
    const body = await req.json();

    const created = await ProjectModel.create(body);
    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

/**
 * DELETE MANY → /api/projects (body: { ids: [] })
 */
export async function DELETE(req: Request) {
  try {
    await connectDb();
    const { ids } = await req.json();

    if (!ids || !Array.isArray(ids)) {
      return NextResponse.json({ success: false, message: "ids must be an array" }, { status: 400 });
    }

    const deleted = await ProjectModel.deleteMany({ _id: { $in: ids } });
    return NextResponse.json({ success: true, deletedCount: deleted.deletedCount });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

/**
 * PUT MANY → Update multiple projects
 * Body: { updates: [{ id: string, data: Partial<IProject> }] }
 */
export async function PUT(req: Request) {
  try {
    await connectDb();
    const { updates } = await req.json();

    if (!updates || !Array.isArray(updates)) {
      return NextResponse.json({ success: false, message: "updates must be an array" }, { status: 400 });
    }

    const results = [];
    for (const item of updates) {
      const updated = await ProjectModel.findByIdAndUpdate(item.id, item.data, { new: true });
      if (updated) results.push(updated);
    }

    return NextResponse.json({ success: true, updated: results });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

/**
 * PATCH → Partial update single project
 * Body: { id: string, data: Partial<IProject> }
 */
export async function PATCH(req: Request) {
  try {
    await connectDb();
    const { id, data } = await req.json();

    if (!id || !data) {
      return NextResponse.json({ success: false, message: "id and data are required" }, { status: 400 });
    }

    const updated = await ProjectModel.findByIdAndUpdate(id, data, { new: true });
    if (!updated) {
      return NextResponse.json({ success: false, message: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

/**
 * FETCH MANY → /api/projects?ids=1,2,3
 */
export async function HEAD(req: Request) {
  try {
    await connectDb();
    const query = new URL(req.url).searchParams.get("ids");

    if (!query) {
      return NextResponse.json({ success: false, message: "ids query required" }, { status: 400 });
    }

    const ids = query.split(",");
    const items = await ProjectModel.find({ _id: { $in: ids } });

    return NextResponse.json({ success: true, data: items });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
