import Link from "next/link";

export default function TopPage() {
  return (
    <main>
      <h1 className="text-4xl mt-10 mb-20 text-center">Login Game</h1>
      <div className="flex gap-4">
        <Link
          href="/login"
          className="text-blue-600 visited:text-purple-600 underline"
        >
          ログイン
        </Link>
        <Link
          href="/test"
          className="text-blue-600 visited:text-purple-600 underline"
        >
          test1ログイン
        </Link>
        <Link
          href="/register"
          className="text-blue-600 visited:text-purple-600 underline"
        >
          新規登録
        </Link>
      </div>
    </main>
  );
}
