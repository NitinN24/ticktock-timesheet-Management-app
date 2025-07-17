"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import TimesheetDetails from "../../../components/TimesheetDetails";
import Navbar from "../../../components/Navbar";
import { useSession } from "next-auth/react";

// Types
interface Task {
  id: string;
  title: string;
  project: string;
  hours: number;
}

interface DayEntry {
  date: string;
  tasks: Task[];
}

// ✅ Define a clear type for fetched entries
interface RawEntry {
  id: string;
  date: string;
  project: string;
  type: string;
  description: string;
  hours: number;
}

export default function TimesheetWeekPage() {
  const { weekId } = useParams();
  const { data: session } = useSession();
  const [dayEntries, setDayEntries] = useState<DayEntry[]>([]);

  useEffect(() => {
    if (!weekId) return;

    fetch(`/api/entries?weekId=${weekId}`)
      .then((res) => res.json())
      .then((entries: RawEntry[]) => {
        const grouped: Record<string, Task[]> = {};

        entries.forEach((entry: RawEntry) => {
          const date = entry.date;
          if (!grouped[date]) {
            grouped[date] = [];
          }

          grouped[date].push({
            id: entry.id,
            title: entry.description,
            project: entry.project,
            hours: entry.hours,
          });
        });

        const transformed: DayEntry[] = Object.keys(grouped).map((date) => ({
          date,
          tasks: grouped[date],
        }));

        // Optional: Sort days chronologically
        transformed.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );

        setDayEntries(transformed);
      });
  }, [weekId]);

  const transformUser = (
    user:
      | {
          name?: string | null;
          email?: string | null;
          image?: string | null;
        }
      | null
      | undefined
  ) => {
    if (!user) return null;
    return {
      name: user.name || undefined,
      email: user.email || undefined,
      image: user.image || undefined,
    };
  };

  if (!session) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={transformUser(session.user)} />
      <main className="max-w-4xl mx-auto p-8">
        <TimesheetDetails days={dayEntries} weekId={weekId as string} />
      </main>
      <footer className="text-center text-gray-400 text-sm p-6">
        © 2024 tentwenty. All rights reserved.
      </footer>
    </div>
  );
}
