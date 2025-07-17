import Link from "next/link";
import StatusBadge from "./StatusBadge";

interface Timesheet {
  id: string;
  week: number;
  dateRange: string;
  status: string;
}

export default function TimesheetTable({
  timesheets,
}: {
  timesheets: Timesheet[];
}) {
  return (
    <div className="bg-white rounded shadow p-6">
      <table className="w-full">
        <thead>
          <tr className="text-left text-gray-500">
            <th>WEEK #</th>
            <th>DATE</th>
            <th>STATUS</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {timesheets.map((ts) => (
            <tr key={ts.id} className="border-t">
              <td>{ts.week}</td>
              <td>{ts.dateRange}</td>
              <td>
                <StatusBadge status={ts.status} />
              </td>
              <td>
                <Link href={`/dashboard/${ts.id}`}>
                  <span className="text-blue-600 cursor-pointer hover:underline">
                    {ts.status === "MISSING"
                      ? "Create"
                      : ts.status === "INCOMPLETE"
                      ? "Update"
                      : "View"}
                  </span>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
