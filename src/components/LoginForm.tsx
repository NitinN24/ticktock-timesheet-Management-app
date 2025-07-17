"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (res?.error) {
      setError("Invalid credentials");
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <form className="w-full max-w-sm" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-semibold mb-6">Welcome back</h2>
      <label className="block mb-2">Email</label>
      <input
        type="email"
        className="mb-4 w-full border rounded px-3 py-2"
        placeholder="name@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label className="block mb-2">Password</label>
      <input
        type="password"
        className="mb-4 w-full border rounded px-3 py-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="flex items-center mb-4">
        <input type="checkbox" id="remember" className="mr-2" />
        <label htmlFor="remember">Remember me</label>
      </div>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700"
      >
        Sign in
      </button>
    </form>
  );
}
