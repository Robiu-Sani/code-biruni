/* eslint-disable @typescript-eslint/no-explicit-any */
import connectDb from "lib/connectdb";
import CaseStudiesModel from "model/caseStudes.model";
import { NextResponse } from "next/server";

/**
 * GET → Get all + search + filtering
 * Supports:
 * /api/case-studies?search=xyz
 * /api/case-studies?name=xyz
 */
export async function GET(req: Request) {
  try {
    await connectDb();

    const { search, name } = Object.fromEntries(
      new URL(req.url).searchParams.entries()
    );

    let query: any = {};

    // Full-text search
    if (search) {
      query = {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { descrition: { $regex: search, $options: "i" } },
        ],
      };
    }

    // Filter by exact name
    if (name) {
      query.name = { $regex: name, $options: "i" };
    }

    const results = await CaseStudiesModel.find(query).sort({
      createdAt: -1,
    });

    return NextResponse.json({ success: true, data: results });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

/**
 * POST → Create new case study
 */
export async function POST(req: Request) {
  try {
    await connectDb();
    const body = await req.json();

    const created = await CaseStudiesModel.create(body);

    return NextResponse.json(
      { success: true, data: created },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

/**
 * DELETE MANY → /api/case-studies (body: { ids: [] })
 */
export async function DELETE(req: Request) {
  try {
    await connectDb();
    const { ids } = await req.json();

    if (!ids || !Array.isArray(ids)) {
      return NextResponse.json(
        { success: false, message: "ids must be array" },
        { status: 400 }
      );
    }

    const deleted = await CaseStudiesModel.deleteMany({
      _id: { $in: ids },
    });

    return NextResponse.json({
      success: true,
      deletedCount: deleted.deletedCount,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

/**
 * PUT MANY (Update multiple items)
 * Body example:
 * {
 *   updates: [
 *     { id: "...", data: { name: "Updated Name" } }
 *   ]
 * }
 */
export async function PUT(req: Request) {
  try {
    await connectDb();

    const { updates } = await req.json();

    if (!updates || !Array.isArray(updates)) {
      return NextResponse.json(
        { success: false, message: "updates must be array" },
        { status: 400 }
      );
    }

    const results = [];

    for (const item of updates) {
      const updated = await CaseStudiesModel.findByIdAndUpdate(
        item.id,
        item.data,
        { new: true }
      );
      results.push(updated);
    }

    return NextResponse.json({
      success: true,
      updated: results,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

/**
 * FETCH MANY → /api/case-studies?ids=1,2,3
 */
export async function HEAD(req: Request) {
  try {
    await connectDb();

    const query = new URL(req.url).searchParams.get("ids");
    if (!query) {
      return NextResponse.json(
        { success: false, message: "ids query required" },
        { status: 400 }
      );
    }

    const ids = query.split(",");

    const items = await CaseStudiesModel.find({
      _id: { $in: ids },
    });

    return NextResponse.json({ success: true, data: items });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
