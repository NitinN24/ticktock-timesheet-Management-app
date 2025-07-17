"use client";
import LoginForm from "../components/LoginForm";

export default function LoginClient() {
  return (
    <div className="min-h-screen flex">
      {/* Left: Login */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-white p-8">
        <LoginForm />
        <div className="mt-12 text-center text-gray-400 text-sm w-full">
          © 2024 tentwenty
        </div>
      </div>
      {/* Right: Intro */}
      <div className="hidden md:flex w-1/2 bg-blue-600 flex-col justify-center items-center text-white p-16">
        <h1 className="text-3xl font-bold mb-4">ticktock</h1>
        <p>
          Introducing ticktock, our cutting-edge timesheet web application
          designed to revolutionize how you manage employee work hours. With
          ticktock, you can effortlessly track and monitor employee attendance
          and productivity from anywhere, anytime, using any internet-connected
          device.
        </p>
      </div>
    </div>
  );
}
