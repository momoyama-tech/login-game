"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAtom } from "jotai";
import {
  userNameAtom,
  emailAtom,
  passwordAtom,
  dateOfBirthAtom,
  addressAtom,
} from "@/atoms/profile";
import { timerAtom } from "@/atoms/profile"; // New atom for timer

export default function LoginPage() {
  const router = useRouter();
  const [storedUserName] = useAtom(userNameAtom);
  const [storedEmail] = useAtom(emailAtom);
  const [storedPassword] = useAtom(passwordAtom);
  const [storedDateOfBirth] = useAtom(dateOfBirthAtom);
  const [storedAddress] = useAtom(addressAtom);

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [isRobot, setIsRobot] = useState(true);
  const [currentScreen, setCurrentScreen] = useState("login"); // "login", "captcha", or "passwordDate"
  const [captchaInput, setCaptchaInput] = useState("");
  const [passwordCreationDate, setPasswordCreationDate] = useState("");
  const [, setTimer] = useAtom(timerAtom);

  useEffect(() => {
    const startTime = Date.now();
    setTimer(startTime);
  }, [setTimer]);

  // Simplified CAPTCHA for demonstration
  const captchaText = "ABC123";
  const captchaImage = "https://via.placeholder.com/150x50.png?text=ABC123";

  const handleLoginSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isRobot) {
      setError("Please confirm you're not a robot.");
      return;
    }
    setCurrentScreen("captcha");
  };

  const handleCaptchaSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (captchaInput !== captchaText) {
      setError("Invalid CAPTCHA. Please try again.");
      return;
    }
    setCurrentScreen("passwordDate");
  };

  const handlePasswordCreationDateSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const submittedDateOfBirth = `${birthYear}-${birthMonth.padStart(
      2,
      "0"
    )}-${birthDay.padStart(2, "0")}`;
    if (
      userName === storedUserName &&
      email === storedEmail &&
      password === storedPassword &&
      submittedDateOfBirth === storedDateOfBirth &&
      address === storedAddress
    ) {
      router.push("/result");
    } else {
      setError("Invalid login information");
      setCurrentScreen("login");
    }
  };

  const renderLoginForm = () => (
    <>
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-700">
        Log in
      </h1>
      <form onSubmit={handleLoginSubmit} className="space-y-4">
        <div className="text-gray-700">
          <label
            htmlFor="userName"
            className="block text-sm font-medium text-gray-700"
          >
            User Name
          </label>
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-600"
            required
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-600"
            required
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-600"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date of Birth
          </label>
          <div className="flex space-x-2">
            <input
              type="number"
              placeholder="Year"
              value={birthYear}
              onChange={(e) => setBirthYear(e.target.value)}
              className="mt-1 block w-1/3 px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-600"
              required
              min="1900"
              max={new Date().getFullYear()}
            />
            <input
              type="number"
              placeholder="Month"
              value={birthMonth}
              onChange={(e) => setBirthMonth(e.target.value)}
              className="mt-1 block w-1/3 px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-600"
              required
              min="1"
              max="12"
            />
            <input
              type="number"
              placeholder="Day"
              value={birthDay}
              onChange={(e) => setBirthDay(e.target.value)}
              className="mt-1 block w-1/3 px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-600"
              required
              min="1"
              max="31"
            />
          </div>
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
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-600"
            required
          />
        </div>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={!isRobot}
            onChange={() => setIsRobot(!isRobot)}
            className="mr-2"
          />
          <label className="text-sm text-gray-700">I'm not a robot</label>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          log in
        </button>
      </form>
      <Link
        href="/forgot-password"
        className="text-xs text-blue-500 hover:underline mt-2 block"
      >
        If you forgot your password
      </Link>
    </>
  );

  const renderCaptchaForm = () => (
    <>
      <h2 className="text-xl font-bold mb-4 text-center text-gray-700">
        Sign in
      </h2>
      <p className="text-center mb-4 text-gray-700">
        続行するには、下に表示される文字を入力してください:
      </p>
      <img src={captchaImage} alt="CAPTCHA" className="mb-4 mx-auto" />
      <form onSubmit={handleCaptchaSubmit} className="space-y-4">
        <input
          type="text"
          value={captchaInput}
          onChange={(e) => setCaptchaInput(e.target.value)}
          placeholder="Enter the text shown above"
          className="w-full p-2 mb-4 border rounded text-gray-700"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          送信
        </button>
      </form>
    </>
  );

  const renderPasswordDateForm = () => (
    <>
      <h2 className="text-xl font-bold mb-4 text-center text-gray-700">
        Password Creation Date
      </h2>
      <form onSubmit={handlePasswordCreationDateSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="passwordCreationDate"
            className="block text-sm font-medium text-gray-700"
          >
            When did you create your password?
          </label>
          <input
            type="date"
            id="passwordCreationDate"
            value={passwordCreationDate}
            onChange={(e) => setPasswordCreationDate(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-600"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </form>
    </>
  );

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center">
      <div className="w-full max-w-md">
        {currentScreen === "login" && renderLoginForm()}
        {currentScreen === "captcha" && renderCaptchaForm()}
        {currentScreen === "passwordDate" && renderPasswordDateForm()}
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>
    </div>
  );
}
