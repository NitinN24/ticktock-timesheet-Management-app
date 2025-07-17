import { NextResponse } from "next/server";
import { timesheetEntries } from "../../lib/mockData";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const weekId = searchParams.get("weekId");
  if (!weekId) return NextResponse.json([], { status: 400 });

  // Check if weekId exists in timesheetEntries
  if (weekId in timesheetEntries) {
    return NextResponse.json(
      timesheetEntries[weekId as keyof typeof timesheetEntries]
    );
  }

  return NextResponse.json([]);
}
