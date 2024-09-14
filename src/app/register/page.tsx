"use client";

import { emailAtom, passwordAtom } from "@/atoms/profile";
import { useAtom } from "jotai";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useRouter } from "next/navigation";

type FormData = {
  email: string;
  password: string;
};

const schema = z.object({
  email: z
    .string()
    .email({ message: "有効なメールアドレスを入力してください" }),
  password: z
    .string()
    .min(8, { message: "パスワードは8文字以上必要です" })
    .regex(
      /^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,100}$/i,
      "パスワードは半角英数字混合で入力してください"
    ),
});

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const router = useRouter();

  const [, setEmail] = useAtom(emailAtom);
  const [, setPassword] = useAtom(passwordAtom);

  const onSubmit = useCallback(
    (data: FormData) => {
      setEmail(data.email);
      setPassword(data.password);
      alert(`メールアドレス: ${data.email} / パスワード: ${data.password}`);

      router.push("/");
    },
    [router, setEmail, setPassword]
  );

  return (
    <main>
      <h1 className="text-4xl mt-10 mb-20 text-center">新規登録</h1>
      <form className="mb-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5">
          <label>
            <span>メールアドレス</span>
            <input
              type="text"
              className="w-full h-10 border border-gray-600 rounded bg-white text-black px-2"
              {...register("email")}
            />
          </label>
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-10">
          <label>
            <span>パスワード</span>
            <input
              type="password"
              className="w-full h-10 border border-gray-600 rounded bg-white text-black px-2"
              {...register("password")}
            />
          </label>
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            ログイン
          </button>
        </div>
      </form>
      <div className="text-center">
        <Link
          href="/"
          className="text-blue-600 visited:text-purple-600 underline"
        >
          トップへ戻る
        </Link>
      </div>
    </main>
  );
}
