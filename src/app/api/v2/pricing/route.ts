/* eslint-disable @typescript-eslint/no-explicit-any */
import connectDb from "lib/connectdb";
import PricingModel from "model/pricing.model";
import { NextResponse } from "next/server";

/**
 * GET → Get all pricing items + search & filter
 * Supports queries like:
 * /api/pricings?search=basic&amountType=monthly
 */
export async function GET(req: Request) {
  try {
    await connectDb();

    const { search, amountType } = Object.fromEntries(
      new URL(req.url).searchParams.entries()
    );

    const query: any = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { title: { $regex: search, $options: "i" } },
        { baseText: { $regex: search, $options: "i" } },
      ];
    }

    if (amountType) {
      query.amountType = amountType;
    }

    const results = await PricingModel.find(query).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: results });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

/**
 * POST → Create a new pricing item
 */
export async function POST(req: Request) {
  try {
    await connectDb();
    const body = await req.json();

    const created = await PricingModel.create(body);
    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

/**
 * DELETE MANY → /api/pricings (body: { ids: [] })
 */
export async function DELETE(req: Request) {
  try {
    await connectDb();
    const { ids } = await req.json();

    if (!ids || !Array.isArray(ids)) {
      return NextResponse.json({ success: false, message: "ids must be an array" }, { status: 400 });
    }

    const deleted = await PricingModel.deleteMany({ _id: { $in: ids } });
    return NextResponse.json({ success: true, deletedCount: deleted.deletedCount });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

/**
 * PUT MANY → Update multiple pricing items
 * Body: { updates: [{ id: string, data: Partial<IPricing> }] }
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
      const updated = await PricingModel.findByIdAndUpdate(item.id, item.data, { new: true });
      if (updated) results.push(updated);
    }

    return NextResponse.json({ success: true, updated: results });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

/**
 * PATCH → Partial update single pricing item
 * Body: { id: string, data: Partial<IPricing> }
 */
export async function PATCH(req: Request) {
  try {
    await connectDb();
    const { id, data } = await req.json();

    if (!id || !data) {
      return NextResponse.json({ success: false, message: "id and data are required" }, { status: 400 });
    }

    const updated = await PricingModel.findByIdAndUpdate(id, data, { new: true });
    if (!updated) {
      return NextResponse.json({ success: false, message: "Pricing item not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

/**
 * FETCH MANY → /api/pricings?ids=1,2,3
 */
export async function HEAD(req: Request) {
  try {
    await connectDb();
    const query = new URL(req.url).searchParams.get("ids");

    if (!query) {
      return NextResponse.json({ success: false, message: "ids query required" }, { status: 400 });
    }

    const ids = query.split(",");
    const items = await PricingModel.find({ _id: { $in: ids } });

    return NextResponse.json({ success: true, data: items });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
