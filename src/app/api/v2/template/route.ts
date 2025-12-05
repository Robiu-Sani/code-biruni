/* eslint-disable @typescript-eslint/no-explicit-any */
import connectDb from "lib/connectdb";
import TemplateModel from "model/template.model";
import { NextResponse } from "next/server";

/**
 * GET → Get all templates + search & filter
 * Supports queries like:
 * /api/templates?search=business
 */
export async function GET(req: Request) {
  try {
    await connectDb();
    const { search, name } = Object.fromEntries(
      new URL(req.url).searchParams.entries()
    );

    const query: any = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { services: { $regex: search, $options: "i" } },
        { facilities: { $regex: search, $options: "i" } },
      ];
    }

    if (name) query.name = { $regex: name, $options: "i" };

    const results = await TemplateModel.find(query).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: results });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

/**
 * POST → Create a new template
 */
export async function POST(req: Request) {
  try {
    await connectDb();
    const body = await req.json();

    const created = await TemplateModel.create(body);
    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

/**
 * DELETE MANY → /api/templates (body: { ids: [] })
 */
export async function DELETE(req: Request) {
  try {
    await connectDb();
    const { ids } = await req.json();

    if (!ids || !Array.isArray(ids)) {
      return NextResponse.json({ success: false, message: "ids must be an array" }, { status: 400 });
    }

    const deleted = await TemplateModel.deleteMany({ _id: { $in: ids } });
    return NextResponse.json({ success: true, deletedCount: deleted.deletedCount });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

/**
 * PUT MANY → Update multiple templates
 * Body: { updates: [{ id: string, data: Partial<ITemplate> }] }
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
      const updated = await TemplateModel.findByIdAndUpdate(item.id, item.data, { new: true });
      if (updated) results.push(updated);
    }

    return NextResponse.json({ success: true, updated: results });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

/**
 * PATCH → Partial update single template
 * Body: { id: string, data: Partial<ITemplate> }
 */
export async function PATCH(req: Request) {
  try {
    await connectDb();
    const { id, data } = await req.json();

    if (!id || !data) {
      return NextResponse.json({ success: false, message: "id and data are required" }, { status: 400 });
    }

    const updated = await TemplateModel.findByIdAndUpdate(id, data, { new: true });
    if (!updated) {
      return NextResponse.json({ success: false, message: "Template not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

/**
 * FETCH MANY → /api/templates?ids=1,2,3
 */
export async function HEAD(req: Request) {
  try {
    await connectDb();
    const query = new URL(req.url).searchParams.get("ids");

    if (!query) {
      return NextResponse.json({ success: false, message: "ids query required" }, { status: 400 });
    }

    const ids = query.split(",");
    const items = await TemplateModel.find({ _id: { $in: ids } });

    return NextResponse.json({ success: true, data: items });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
