"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { timesheets, TimesheetWeek } from "@/app/lib/mockData";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function DashboardClient() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [weeks, setWeeks] = useState<TimesheetWeek[]>([]);

  useEffect(() => {
    setWeeks(timesheets);
    setLoading(false);
  }, []);

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading timesheet entries...
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Please log in to view this page.
      </div>
    );
  }

  const user = session.user
    ? {
        name: session.user.name || undefined,
        email: session.user.email || undefined,
        image: session.user.image || undefined,
      }
    : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} />

      <main className="max-w-4xl mx-auto p-8">
        <h2 className="text-2xl font-bold mb-6">Your Timesheets</h2>

        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Week #
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {weeks.map((week) => (
                <tr key={week.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    Week {week.week}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {week.dateRange}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        week.status === "COMPLETED"
                          ? "bg-green-100 text-green-700"
                          : week.status === "INCOMPLETE"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-pink-100 text-pink-700"
                      }`}
                    >
                      {week.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {week.status === "COMPLETED" && (
                      <Link href={`/dashboard/${week.id}`}>
                        <span className="text-blue-600 hover:underline cursor-pointer">
                          View
                        </span>
                      </Link>
                    )}
                    {week.status === "INCOMPLETE" && (
                      <Link href={`/dashboard/${week.id}/edit`}>
                        <span className="text-blue-600 hover:underline cursor-pointer">
                          Update
                        </span>
                      </Link>
                    )}
                    {week.status === "MISSING" && (
                      <Link href={`/dashboard/${week.id}/create`}>
                        <span className="text-blue-600 hover:underline cursor-pointer">
                          Create
                        </span>
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      <footer className="text-center text-gray-400 text-sm p-6">
        © 2024 tentwenty. All rights reserved.
      </footer>
    </div>
  );
}
