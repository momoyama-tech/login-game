import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1 className="text-4xl mt-10 mb-20 text-center">ログイン</h1>
      <div className="flex gap-4">
        <Link
          href="/result"
          className="text-blue-600 visited:text-purple-600 underline"
        >
          リザルト
        </Link>
      </div>
    </main>
  );
}
