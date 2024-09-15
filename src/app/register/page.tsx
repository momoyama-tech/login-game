"use client";

import {
  userNameAtom,
  emailAtom,
  passwordAtom,
  dateOfBirthAtom,
  addressAtom,
} from "@/atoms/profile";
import { useAtom } from "jotai";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useRouter } from "next/navigation";

type FormData = {
  userName: string;
  email: string;
  password: string;
  passwordConfirm: string;
  dateOfBirth: string;
  address: string;
};

const schema = z
  .object({
    userName: z.string().min(1, { message: "ユーザー名は必須です" }),
    email: z
      .string()
      .email({ message: "有効なメールアドレスを入力してください" }),
    password: z
      .string()
      .min(8, { message: "パスワードは8文字です" })
      .max(8, { message: "パスワードは8文字です" })
      .regex(
        /^(?=.*[a-z])(?=.*\d)[a-z\d]{8}$/i,
        "パスワードは半角英数字混合で入力してください"
      ),
    passwordConfirm: z.string(),
    dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "正しい日付形式で入力してください（YYYY-MM-DD）",
    }),
    address: z.string().min(1, { message: "住所は必須です" }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "パスワードが一致しません",
    path: ["passwordConfirm"],
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

  const [, setUserName] = useAtom(userNameAtom);
  const [, setEmail] = useAtom(emailAtom);
  const [, setPassword] = useAtom(passwordAtom);
  const [, setDateOfBirth] = useAtom(dateOfBirthAtom);
  const [, setAddress] = useAtom(addressAtom);

  const onSubmit = useCallback(
    (data: FormData) => {
      setUserName(data.userName);
      setEmail(data.email);
      setPassword(data.password);
      setDateOfBirth(data.dateOfBirth);
      setAddress(data.address);

      // Get current date as password creation date
      const passwordCreationDate = new Date().toISOString().split("T")[0];

      alert(`登録が完了しました。パスワード作成日: ${passwordCreationDate}`);
      router.push("/login");
    },
    [router, setUserName, setEmail, setPassword, setDateOfBirth, setAddress]
  );

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-700">
          Sign up
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="userName"
              className="block text-sm font-medium text-gray-700"
            >
              User name
            </label>
            <input
              type="text"
              id="userName"
              {...register("userName")}
              className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-600"
            />
            {errors.userName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.userName.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-600"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password (8 characters)
            </label>
            <input
              type="password"
              id="password"
              maxLength={8}
              {...register("password")}
              className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-600"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="passwordConfirm"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="passwordConfirm"
              maxLength={8}
              {...register("passwordConfirm")}
              className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-600"
            />
            {errors.passwordConfirm && (
              <p className="text-red-500 text-xs mt-1">
                {errors.passwordConfirm.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="dateOfBirth"
              className="block text-sm font-medium text-gray-700"
            >
              Date of birth
            </label>
            <input
              type="date"
              id="dateOfBirth"
              {...register("dateOfBirth")}
              className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-600"
            />
            {errors.dateOfBirth && (
              <p className="text-red-500 text-xs mt-1">
                {errors.dateOfBirth.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              {...register("address")}
              className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-600"
            />
            {errors.address && (
              <p className="text-red-500 text-xs mt-1">
                {errors.address.message}
              </p>
            )}
          </div>
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Create new account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
