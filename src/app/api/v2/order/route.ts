/* eslint-disable @typescript-eslint/no-explicit-any */
import connectDb from "lib/connectdb";
import OrderModel from "model/order.model";
import { NextResponse } from "next/server";

/**
 * GET → Get all orders + search & filter
 * Supports queries like:
 * /api/orders?search=john&projectType=website
 */
export async function GET(req: Request) {
  try {
    await connectDb();
    const { search, projectType } = Object.fromEntries(
      new URL(req.url).searchParams.entries()
    );

    const query: any = {};

    // Search by name, number, email, or note
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { number: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { note: { $regex: search, $options: "i" } },
      ];
    }

    // Filter by projectType
    if (projectType) query.projectType = { $regex: projectType, $options: "i" };

    const results = await OrderModel.find(query).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: results });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

/**
 * POST → Create new order
 */
export async function POST(req: Request) {
  try {
    await connectDb();
    const body = await req.json();

    const created = await OrderModel.create(body);
    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

/**
 * DELETE MANY → /api/orders (body: { ids: [] })
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

    const deleted = await OrderModel.deleteMany({ _id: { $in: ids } });
    return NextResponse.json({ success: true, deletedCount: deleted.deletedCount });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

/**
 * PUT MANY → Update multiple orders
 * Body: { updates: [{ id: string, data: Partial<IOrder> }] }
 */
export async function PUT(req: Request) {
  try {
    await connectDb();
    const { updates } = await req.json();

    if (!updates || !Array.isArray(updates)) {
      return NextResponse.json(
        { success: false, message: "updates must be an array" },
        { status: 400 }
      );
    }

    const results = [];
    for (const item of updates) {
      const updated = await OrderModel.findByIdAndUpdate(item.id, item.data, { new: true });
      if (updated) results.push(updated);
    }

    return NextResponse.json({ success: true, updated: results });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

/**
 * PATCH → Partial update single order
 * Body: { id: string, data: Partial<IOrder> }
 */
export async function PATCH(req: Request) {
  try {
    await connectDb();
    const { id, data } = await req.json();

    if (!id || !data) {
      return NextResponse.json(
        { success: false, message: "id and data are required" },
        { status: 400 }
      );
    }

    const updated = await OrderModel.findByIdAndUpdate(id, data, { new: true });
    if (!updated) {
      return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

/**
 * FETCH MANY → /api/orders?ids=1,2,3
 */
export async function HEAD(req: Request) {
  try {
    await connectDb();
    const query = new URL(req.url).searchParams.get("ids");

    if (!query) {
      return NextResponse.json({ success: false, message: "ids query required" }, { status: 400 });
    }

    const ids = query.split(",");
    const items = await OrderModel.find({ _id: { $in: ids } });

    return NextResponse.json({ success: true, data: items });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
