import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1 className="text-4xl mt-10 mb-20 text-center">新規登録</h1>
      <div className="flex gap-4">
        <Link
          href="/"
          className="text-blue-600 visited:text-purple-600 underline"
        >
          トップ
        </Link>
      </div>
    </main>
  );
}
