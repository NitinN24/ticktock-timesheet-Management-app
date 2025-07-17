"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Zod schema
const entrySchema = z.object({
  project: z.string().min(1, "Project is required"),
  type: z.string().min(1, "Type of work is required"),
  description: z.string().min(1, "Task description is required"),
  hours: z
    .number()
    .min(1, "Hours must be at least 1")
    .max(12, "Hours cannot exceed 12"),
});

export type EntryFormData = z.infer<typeof entrySchema>;

interface AddEntryModalProps {
  weekId: string;
  taskToEdit?: EntryFormData;
  callbacks: {
    onClose: () => void;
    onSubmit?: (data: EntryFormData) => void;
  };
}

export default function AddEntryModal({
  weekId,
  taskToEdit,
  callbacks,
}: AddEntryModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EntryFormData>({
    resolver: zodResolver(entrySchema),
    defaultValues: taskToEdit || {
      project: "",
      type: "",
      description: "",
      hours: 1,
    },
  });

  const onSubmit = (data: EntryFormData) => {
    console.log("Form data:", data);
    console.log("Week ID:", weekId);
    callbacks.onSubmit?.(data);
    callbacks.onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">
          {taskToEdit ? "Edit Task" : "Add New Entry"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="block mb-2">Select Project *</label>
          <input
            {...register("project")}
            className="w-full border rounded px-3 py-2 mb-2"
            placeholder="Enter project name"
          />
          {errors.project && (
            <p className="text-red-500 text-xs mb-2">
              {errors.project.message}
            </p>
          )}

          <label className="block mb-2">Type of Work *</label>
          <input
            {...register("type")}
            className="w-full border rounded px-3 py-2 mb-2"
            placeholder="Enter type of work"
          />
          {errors.type && (
            <p className="text-red-500 text-xs mb-2">{errors.type.message}</p>
          )}

          <label className="block mb-2">Task Description *</label>
          <textarea
            {...register("description")}
            className="w-full border rounded px-3 py-2 mb-2"
            placeholder="Describe the task"
            rows={3}
          />
          {errors.description && (
            <p className="text-red-500 text-xs mb-2">
              {errors.description.message}
            </p>
          )}

          <label className="block mb-2">Hours *</label>
          <input
            type="number"
            {...register("hours", { valueAsNumber: true })}
            min={1}
            max={12}
            step={0.5}
            className="w-full border rounded px-3 py-2 mb-2"
          />
          {errors.hours && (
            <p className="text-red-500 text-xs mb-2">{errors.hours.message}</p>
          )}

          <div className="flex justify-between mt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {taskToEdit ? "Update Task" : "Add Entry"}
            </button>
            <button
              type="button"
              onClick={callbacks.onClose}
              className="ml-2 px-4 py-2 rounded border hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
