import { signOut } from "next-auth/react";

interface User {
  name?: string;
  email?: string;
  image?: string;
}

export default function Navbar({ user }: { user: User | null }) {
  return (
    <nav className="flex justify-between items-center bg-white p-4 border-b">
      <div className="font-bold text-xl">ticktock</div>
      <div>
        <span className="mr-4">{user?.name}</span>
        <button
          onClick={() => signOut()}
          className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
