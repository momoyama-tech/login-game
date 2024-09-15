"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import {
  userNameAtom,
  emailAtom,
  passwordAtom,
  dateOfBirthAtom,
  addressAtom,
} from "@/atoms/profile";

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
  const [currentScreen, setCurrentScreen] = useState("login");
  const [mathProblem, setMathProblem] = useState({ question: "", answer: 0 });
  const [mathInput, setMathInput] = useState("");
  const [passwordCreationDate, setPasswordCreationDate] = useState("");
  const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 });

  // Bad UI: Password input as individual characters
  const [passwordChars, setPasswordChars] = useState(Array(8).fill(""));

  useEffect(() => {
    setPassword(passwordChars.join(""));
  }, [passwordChars]);

  const handleLoginSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    generateMathProblem();
    setCurrentScreen("mathProblem");
  };

  const handleMathProblemSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (parseInt(mathInput) === mathProblem.answer) {
      setCurrentScreen("passwordDate");
    } else {
      setError("Incorrect answer. Try again.");
      generateMathProblem();
    }
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

  // Bad UI: Random button position
  const randomizeButtonPosition = () => {
    setButtonPosition({
      top: Math.random() * (window.innerHeight - 50),
      left: Math.random() * (window.innerWidth - 100),
    });
  };

  const generateMathProblem = () => {
    const operations = ["+", "-", "*"];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    let a, b, question, answer;

    if (Math.random() < 0.2) {
      // 20% chance for a harder problem
      a = Math.floor(Math.random() * 100) + 1;
      b = Math.floor(Math.random() * 100) + 1;
      if (operation === "+") {
        question = `${a} + ${b}`;
        answer = a + b;
      } else if (operation === "-") {
        question = `${a} - ${b}`;
        answer = a - b;
      } else {
        question = `${a} * ${b}`;
        answer = a * b;
      }
    } else {
      a = Math.floor(Math.random() * 10) + 1;
      b = Math.floor(Math.random() * 10) + 1;
      question = `${a} ${operation} ${b}`;
      answer = eval(`${a} ${operation} ${b}`);
    }

    setMathProblem({ question, answer });
  };

  const renderLoginForm = () => (
    <>
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-700">
        Log in
      </h1>
      <form onSubmit={handleLoginSubmit} className="space-y-4">
        <div>
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
          <label className="block text-sm font-medium text-gray-700">
            Password (enter each character separately)
          </label>
          <div className="flex space-x-2">
            {passwordChars.map((char, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={char}
                onChange={(e) => {
                  const newChars = [...passwordChars];
                  newChars[index] = e.target.value;
                  setPasswordChars(newChars);
                }}
                className="mt-1 block w-8 px-1 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-600"
                required
              />
            ))}
          </div>
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
            <select
              value={birthMonth}
              onChange={(e) => setBirthMonth(e.target.value)}
              className="mt-1 block w-1/3 px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-600"
              required
            >
              <option value="">Month</option>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                <option key={month} value={month.toString().padStart(2, "0")}>
                  {month}
                </option>
              ))}
            </select>
            <input
              type="range"
              min="1"
              max="31"
              value={birthDay}
              onChange={(e) => setBirthDay(e.target.value)}
              className="mt-1 block w-1/3"
              required
            />
            <span>{birthDay}</span>
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
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onMouseEnter={randomizeButtonPosition}
          style={{
            position: "fixed",
            top: buttonPosition.top,
            left: buttonPosition.left,
          }}
        >
          log in
        </button>
      </form>
    </>
  );

  const renderMathProblem = () => (
    <>
      <h2 className="text-xl font-bold text-gray-700 mb-4 text-center">Verify Identity</h2>
      <p className="text-center text-gray-700 mb-4">
        Please solve this math problem to continue:
      </p>
      <p className="text-center text-2xl font-bold text-gray-700 mb-4">
        {mathProblem.question} = ?
      </p>
      <form onSubmit={handleMathProblemSubmit} className="space-y-4 text-gray-700">
        <input
          type="number"
          value={mathInput}
          onChange={(e) => setMathInput(e.target.value)}
          placeholder="Enter the answer"
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Verify
        </button>
      </form>
    </>
  );

  const renderPasswordDateForm = () => (
    <>
      <h2 className="text-xl font-bold mb-4 text-center">
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
        {currentScreen === "mathProblem" && renderMathProblem()}
        {currentScreen === "passwordDate" && renderPasswordDateForm()}
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>
    </div>
  );
}
