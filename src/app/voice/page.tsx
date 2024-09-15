"use client";

import { timerAtom } from "@/atoms/profile";
import { useAtom } from "jotai";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function VoicePage() {
  const router = useRouter();

  const [decibels, setDecibels] = useState(0);
  const [error, setError] = useState("");
  const [stream, setStream] = useState<MediaStream | null>(null);

  const onSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setError("");

      if (decibels >= 70) {
        router.push("/result");
        return;
      }

      setError("70dB以上出してください📣");
    },
    [decibels, router]
  );

  useEffect(() => {
    let audioContext: AudioContext;
    let analyser: AnalyserNode;
    let microphone: MediaStreamAudioSourceNode;
    let javascriptNode: ScriptProcessorNode;

    const startAudio = async () => {
      try {
        if (stream == null) {
          const mediaStream = await navigator.mediaDevices.getUserMedia({
            audio: true,
          });
          setStream(mediaStream);
        }

        if (stream == null) return;

        console.log("streamあるよ！");

        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioContext.createAnalyser();
        microphone = audioContext.createMediaStreamSource(stream);
        javascriptNode = audioContext.createScriptProcessor(1024, 1, 1);

        analyser.smoothingTimeConstant = 0.8;
        analyser.fftSize = 1024;

        microphone.connect(analyser);
        analyser.connect(javascriptNode);
        javascriptNode.connect(audioContext.destination);

        javascriptNode.onaudioprocess = () => {
          const array = new Float32Array(analyser.fftSize);
          analyser.getFloatTimeDomainData(array);

          let sum = 0.0;
          for (let i = 0; i < array.length; i++) {
            sum += array[i] * array[i];
          }
          const rms = Math.sqrt(sum / array.length);
          const decibel = (100 / 32) * 10 * Math.log10(rms) + 100;
          if (!Number.isFinite(decibel)) return;

          console.log(`decibel: ${decibel}`);

          setDecibels(parseFloat(decibel.toFixed(2)));
        };
      } catch (err) {
        console.error("マイクへのアクセスが拒否されました:", err);
        alert("マイク許可せんかい😡");
        router.push("/");
      }
    };

    startAudio();

    return () => {
      if (javascriptNode) javascriptNode.disconnect();
      if (microphone) microphone.disconnect();
      if (analyser) analyser.disconnect();
      if (audioContext) audioContext.close();
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [router, stream]);

  const [, setTimer] = useAtom(timerAtom);

  useEffect(() => {
    const startTime = Date.now();
    setTimer(startTime);
  }, [setTimer]);

  return (
    <main>
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-700">
        Voice Login
      </h1>
      <div className="mb-5">
        <p className="mb-4 text-black">70dB以上出してください📣</p>
        <p className="text-2xl bold text-black">{decibels} dB</p>
      </div>
      <form onSubmit={onSubmit} className="mb-5">
        <button
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-300"
          disabled={decibels < 70}
        >
          ログイン
        </button>
        {error ?? <p className="text-red-500 text-sm mt-2">{error}</p>}
      </form>
      <div className="text-center">
        <Link
          href="/"
          className="text-blue-600 visited:text-purple-600 underline"
        >
          トップへ
        </Link>
      </div>
    </main>
  );
}
