const statusColors: { [key: string]: string } = {
  COMPLETED: "bg-green-100 text-green-700",
  INCOMPLETE: "bg-yellow-100 text-yellow-700",
  MISSING: "bg-pink-100 text-pink-700",
};

export default function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${
        statusColors[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
}
