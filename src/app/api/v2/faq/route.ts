/* eslint-disable @typescript-eslint/no-explicit-any */
import connectDb from "lib/connectdb";
import FaqModel from "model/faq.model";
import { NextResponse } from "next/server";

/**
 * GET → Get all FAQs + search support
 * /api/faq?search=login
 */
export async function GET(req: Request) {
  try {
    await connectDb();

    const { search } = Object.fromEntries(
      new URL(req.url).searchParams.entries()
    );

    let query: any = {};

    if (search) {
      query = {
        $or: [
          { question: { $regex: search, $options: "i" } },
          { "answer.text": { $regex: search, $options: "i" } },
          { "answer.types": { $regex: search, $options: "i" } },
        ],
      };
    }

    const data = await FaqModel.find(query).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

/**
 * POST → Create new FAQ
 */
export async function POST(req: Request) {
  try {
    await connectDb();

    const body = await req.json();

    const created = await FaqModel.create(body);

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
 * DELETE MANY → Remove multiple FAQs using IDs
 * {
 *   ids: ["id1", "id2"]
 * }
 */
export async function DELETE(req: Request) {
  try {
    await connectDb();

    const { ids } = await req.json();

    if (!ids || !Array.isArray(ids)) {
      return NextResponse.json(
        { success: false, message: "ids must be an array" },
        { status: 400 }
      );
    }

    const deleted = await FaqModel.deleteMany({ _id: { $in: ids } });

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
 * PUT MANY → Update multiple FAQs
 * {
 *   updates: [
 *     { id: "...", data: { question: "New Q" } }
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
      const updated = await FaqModel.findByIdAndUpdate(
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
 * FETCH MANY (HEAD) → Return FAQs by IDs
 * /api/faq?ids=1,2,3
 */
export async function HEAD(req: Request) {
  try {
    await connectDb();

    const idsString = new URL(req.url).searchParams.get("ids");
    if (!idsString) {
      return NextResponse.json(
        { success: false, message: "ids query is required" },
        { status: 400 }
      );
    }

    const ids = idsString.split(",");

    const data = await FaqModel.find({ _id: { $in: ids } });

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
