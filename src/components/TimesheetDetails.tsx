"use client";
import { useState } from "react";
import AddEntryModal from "./AddEntryModal";

// Types
interface Task {
  id: string;
  description: string;
  project: string;
  hours: number;
  type?: string;
  date?: string;
}

interface DayEntry {
  date: string;
  tasks: Task[];
}

interface EntryFormData {
  project: string;
  type: string;
  description: string;
  hours: number;
}

interface Props {
  days: DayEntry[];
  weekId: string;
}

export default function TimesheetDetails({ days, weekId }: Props) {
  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [daysState, setDaysState] = useState<DayEntry[]>(days);

  const totalHours = daysState.reduce(
    (acc, day) => acc + day.tasks.reduce((sum, task) => sum + task.hours, 0),
    0
  );

  const handleSubmitEntry = async (data: EntryFormData) => {
    const today = new Date().toISOString().split("T")[0];

    if (editTask) {
      try {
        let taskDate = editTask.date;

        if (!taskDate) {
          const dayWithTask = daysState.find((day) =>
            day.tasks.some((t) => t.id === editTask.id)
          );
          taskDate = dayWithTask?.date;
        }

        if (!taskDate) {
          console.error("Could not find task date");
          return;
        }

        const res = await fetch(`/api/tasks`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...data,
            id: editTask.id,
          }),
        });

        if (!res.ok) {
          const errorText = await res.text();
          console.error("Update failed:", res.status, errorText);
          throw new Error(`Failed to update task: ${res.status} ${errorText}`);
        }

        const updatedDays = daysState.map((day) => ({
          ...day,
          tasks: day.tasks.map((task) =>
            task.id === editTask.id
              ? { ...task, ...data, date: taskDate }
              : task
          ),
        }));

        setDaysState(updatedDays);
      } catch (error) {
        console.error("Edit failed:", error);
      }
    } else {
      // Creating new task
      const newTask: Task = {
        id: crypto.randomUUID(),
        description: data.description,
        project: data.project,
        hours: data.hours,
        type: data.type,
        date: today,
      };

      try {
        const res = await fetch("/api/tasks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...newTask,
            weekId,
          }),
        });

        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`Failed to add task: ${res.status} ${errorText}`);
        }
      } catch (err) {
        console.error("❌ Failed to persist new task:", err);
      }

      let updated = false;

      const updatedDays = daysState.map((day) => {
        if (day.date === today) {
          updated = true;
          return { ...day, tasks: [...day.tasks, newTask] };
        }
        return day;
      });

      if (!updated) {
        updatedDays.push({
          date: today,
          tasks: [newTask],
        });
      }

      setDaysState(updatedDays);
    }

    setShowModal(false);
    setEditTask(null);
  };

  const handleDelete = async (taskId: string) => {
    try {
      const res = await fetch(`/api/tasks?id=${taskId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("❌ Failed to delete task:", res.status, errorText);
        return;
      }

      setDaysState((prev) =>
        prev.map((day) => ({
          ...day,
          tasks: day.tasks.filter((task) => task.id !== taskId),
        }))
      );
    } catch (error) {
      console.error("❌ Delete request failed:", error);
    }
  };

  return (
    <div className="bg-white rounded shadow p-6">
      <h2 className="text-lg font-bold mb-4">This weeks timesheet</h2>

      <div className="flex items-center justify-between mb-6">
        <span className="text-sm text-gray-600">{totalHours}/40 hrs</span>
        <div className="w-1/2 bg-gray-200 rounded h-2 mx-4">
          <div
            className="bg-blue-600 h-2 rounded"
            style={{ width: `${Math.min((totalHours / 40) * 100, 100)}%` }}
          />
        </div>
        <button
          onClick={() => {
            setEditTask(null);
            setShowModal(true);
          }}
          className="bg-blue-600 text-white px-4 py-1 rounded text-sm"
        >
          + Add new task
        </button>
      </div>

      {daysState.length > 0 ? (
        daysState.map((day) => (
          <div key={day.date} className="mb-6">
            <h3 className="text-sm text-gray-500 mb-2">
              {new Date(day.date).toDateString()}
            </h3>
            <ul className="space-y-2">
              {day.tasks.map((task) => (
                <li
                  key={task.id}
                  className="flex justify-between items-center border p-3 rounded"
                >
                  <div>
                    <p className="font-medium text-sm">{task.description}</p>
                    <p className="text-xs text-gray-500">{task.project}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-blue-600 text-sm">
                      {task.hours} hrs
                    </span>
                    <button
                      onClick={() => {
                        setEditTask(task);
                        setShowModal(true);
                      }}
                      className="text-xs text-gray-400 hover:text-blue-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(task.id)}
                      className="text-xs text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
              <li>
                <button
                  onClick={() => {
                    setEditTask(null);
                    setShowModal(true);
                  }}
                  className="text-blue-500 text-xs mt-2"
                >
                  + Add new task
                </button>
              </li>
            </ul>
          </div>
        ))
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">No tasks recorded yet</p>
          <button
            onClick={() => {
              setEditTask(null);
              setShowModal(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded text-sm"
          >
            Add your first task
          </button>
        </div>
      )}

      {showModal && (
        <AddEntryModal
          weekId={weekId}
          taskToEdit={
            editTask
              ? {
                  project: editTask.project,
                  type: editTask.type || "",
                  description: editTask.description,
                  hours: editTask.hours,
                }
              : undefined
          }
          callbacks={{
            onClose: () => {
              setShowModal(false);
              setEditTask(null);
            },
            onSubmit: handleSubmitEntry,
          }}
        />
      )}
    </div>
  );
}
