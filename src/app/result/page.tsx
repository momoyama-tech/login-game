"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAtom } from "jotai";
import { timerAtom } from "@/atoms/profile";

export default function ResultPage() {
  const [startTime] = useAtom(timerAtom);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const endTime = Date.now();
    const timeElapsed = endTime - startTime;
    setElapsedTime(timeElapsed);
  }, [startTime]);

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between items-center p-6">
      <div className="flex flex-col flex-grow items-center justify-center space-y-6">
        <h1 className="text-6xl font-bold text-gray-800">
          Welcome
        </h1>
        <h2 className="text-3xl text-gray-700">
          Time: {(elapsedTime / 1000).toFixed(2)} 秒
        </h2>
      </div>
      
      <div className="mb-6 w-full max-w-md">
        <Link href="/" className="block w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center">
          Logout
        </Link>
      </div>
    </div>
  );
}
