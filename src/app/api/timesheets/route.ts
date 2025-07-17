import { NextResponse } from "next/server";
import { timesheets } from "../../lib/mockData";

export async function GET() {
  return NextResponse.json(timesheets);
}
