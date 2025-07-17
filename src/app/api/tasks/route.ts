import { NextRequest, NextResponse } from "next/server";
import { timesheetEntries } from "@/app/lib/mockData";

// --- Types ---
interface Task {
  id: string;
  project: string;
  type: string;
  description: string;
  hours: number;
  date: string;
}

interface TaskLocation {
  weekId: string;
  taskIndex: number;
}

// Type for validation input
interface TaskValidationInput {
  id?: unknown;
  project?: unknown;
  type?: unknown;
  description?: unknown;
  hours?: unknown;
}

// --- Helper: Find task location in data structure ---
function findTaskLocation(taskId: string): TaskLocation | null {
  for (const [weekId, entries] of Object.entries(timesheetEntries)) {
    const taskIndex = entries.findIndex((entry) => entry.id === taskId);
    if (taskIndex !== -1) return { weekId, taskIndex };
  }
  return null;
}

// --- Helper: Validate task data ---
function validateTaskData(data: TaskValidationInput): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!data.id || typeof data.id !== "string") {
    errors.push("Invalid or missing id");
  }

  if (!data.project || typeof data.project !== "string") {
    errors.push("Invalid or missing project");
  }

  if (!data.type || typeof data.type !== "string") {
    errors.push("Invalid or missing type");
  }

  if (!data.description || typeof data.description !== "string") {
    errors.push("Invalid or missing description");
  }

  if (!data.hours || typeof data.hours !== "number" || data.hours <= 0) {
    errors.push("Invalid or missing hours (must be a positive number)");
  }

  return { isValid: errors.length === 0, errors };
}

// --- POST: Add New Task ---
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, project, type, description, hours, date, weekId } = body;

    // Validate required fields
    if (!weekId || typeof weekId !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid weekId" },
        { status: 400 }
      );
    }

    if (!date || typeof date !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid date" },
        { status: 400 }
      );
    }

    const validation = validateTaskData({
      id,
      project,
      type,
      description,
      hours,
    });
    if (!validation.isValid) {
      return NextResponse.json(
        { error: "Validation failed", details: validation.errors },
        { status: 400 }
      );
    }

    // Check if task ID already exists
    const existingLocation = findTaskLocation(id);
    if (existingLocation) {
      return NextResponse.json(
        { error: "Task with this ID already exists" },
        { status: 409 }
      );
    }

    const newTask: Task = {
      id,
      project: project.trim(),
      type: type.trim(),
      description: description.trim(),
      hours: Number(hours),
      date,
    };

    if (!timesheetEntries[weekId]) {
      timesheetEntries[weekId] = [];
    }

    timesheetEntries[weekId].push(newTask);

    return NextResponse.json(
      { message: "Task added successfully", task: newTask },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/tasks error:", error);
    return NextResponse.json(
      { error: "Failed to parse request body or server error" },
      { status: 500 }
    );
  }
}

// --- PUT: Update Existing Task ---
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, project, type, description, hours } = body;

    const validation = validateTaskData({
      id,
      project,
      type,
      description,
      hours,
    });
    if (!validation.isValid) {
      return NextResponse.json(
        { error: "Validation failed", details: validation.errors },
        { status: 400 }
      );
    }

    const location = findTaskLocation(id);
    if (!location) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    const existingTask = timesheetEntries[location.weekId][location.taskIndex];
    const updatedTask: Task = {
      ...existingTask,
      project: project.trim(),
      type: type.trim(),
      description: description.trim(),
      hours: Number(hours),
    };

    timesheetEntries[location.weekId][location.taskIndex] = updatedTask;

    return NextResponse.json(
      { message: "Task updated successfully", task: updatedTask },
      { status: 200 }
    );
  } catch (error) {
    console.error("PUT /api/tasks error:", error);
    return NextResponse.json(
      { error: "Failed to parse request body or server error" },
      { status: 500 }
    );
  }
}

// --- DELETE: Remove Task ---
export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const taskId = url.searchParams.get("id");

    if (!taskId || typeof taskId !== "string" || taskId.trim() === "") {
      return NextResponse.json(
        { error: "Valid task ID required" },
        { status: 400 }
      );
    }

    const location = findTaskLocation(taskId);
    if (!location) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    // Store the task being deleted for response
    const deletedTask = timesheetEntries[location.weekId][location.taskIndex];

    timesheetEntries[location.weekId].splice(location.taskIndex, 1);

    // Clean up empty week entries
    if (timesheetEntries[location.weekId].length === 0) {
      delete timesheetEntries[location.weekId];
    }

    return NextResponse.json(
      {
        message: "Task deleted successfully",
        deletedTask,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE /api/tasks error:", error);
    return NextResponse.json(
      { error: "Failed to delete task" },
      { status: 500 }
    );
  }
}

// --- GET: Retrieve tasks (optional helper method) ---
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const weekId = url.searchParams.get("weekId");
    const taskId = url.searchParams.get("id");

    if (taskId) {
      const location = findTaskLocation(taskId);
      if (!location) {
        return NextResponse.json({ error: "Task not found" }, { status: 404 });
      }

      const task = timesheetEntries[location.weekId][location.taskIndex];
      return NextResponse.json({ task }, { status: 200 });
    }

    if (weekId) {
      const tasks = timesheetEntries[weekId] || [];
      return NextResponse.json({ tasks }, { status: 200 });
    }

    return NextResponse.json({ timesheetEntries }, { status: 200 });
  } catch (error) {
    console.error("GET /api/tasks error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve tasks" },
      { status: 500 }
    );
  }
}
