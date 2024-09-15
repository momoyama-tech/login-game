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
    <main className="min-h-screen bg-white flex flex-col justify-center items-center">
      <h1 className="text-4xl mb-10 text-center text-gray-800">リザルト</h1>
      <p className="text-2xl mb-8 text-gray-700">
        ログイン所要時間: {(elapsedTime / 1000).toFixed(2)} 秒
      </p>
      <Link
        href="/"
        className="text-blue-600 hover:text-blue-800 underline text-lg"
      >
        ログアウトする
      </Link>
    </main>
  );
}
