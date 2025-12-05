/* eslint-disable @typescript-eslint/no-explicit-any */
import connectDb from "lib/connectdb";
import ContactModel from "model/contact.model";
import { NextResponse } from "next/server";

/**
 * GET → Fetch the single contact document
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: Request) {
  try {
    await connectDb();
    const contact = await ContactModel.findOne({});
    return NextResponse.json({ success: true, data: contact });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

/**
 * POST → Create or replace the contact document
 * If a document already exists, delete it first
 */
export async function POST(req: Request) {
  try {
    await connectDb();
    const body = await req.json();

    // Delete previous contact if exists
    await ContactModel.deleteMany({});

    // Create new contact
    const created = await ContactModel.create(body);
    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

/**
 * PATCH → Update the existing contact document
 * Body: Partial<IContact>
 */
export async function PATCH(req: Request) {
  try {
    await connectDb();
    const body = await req.json();

    const existing = await ContactModel.findOne({});
    if (!existing) {
      return NextResponse.json({ success: false, message: "No contact found to update" }, { status: 404 });
    }

    const updated = await ContactModel.findByIdAndUpdate(existing._id, body, { new: true });
    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

/**
 * DELETE → Delete the contact document
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function DELETE(req: Request) {
  try {
    await connectDb();
    const deleted = await ContactModel.deleteMany({});
    return NextResponse.json({ success: true, deletedCount: deleted.deletedCount });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
