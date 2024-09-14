import Link from "next/link";

export default function ResultPage() {
  return (
    <main>
      <h1 className="text-4xl mt-10 mb-20 text-center">リザルト</h1>
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
