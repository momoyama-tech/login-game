"use client";

import Link from "next/link";

export default function MidPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-between items-center p-6">
      <div className="flex-grow flex items-center justify-center">
        <h1 className="text-5xl font-bold text-gray-800">Login Game</h1>
      </div>
      <div className="flex-grow flex items-center justify-center">
        <h1 className="text-3xl font-bold text-gray-800">Select Login</h1>
      </div>
      <div className="mb-6 space-y-4">
        <Link
          href="/login"
          className="block w-full max-w-md mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center"
        >
          Login
        </Link>
        <Link
          href="/test"
          className="block w-full max-w-md mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center"
        >
          Login Test1
        </Link>
        <Link
          href="/voice"
          className="block w-full max-w-md mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center"
        >
          Voice Login
        </Link>
      </div>
    </div>
  );
}
