"use client";
import { useEffect, useState } from "react";

interface TextEncryptedProps {
  text: string;
  interval?: number;
}

const chars = "-_~`!@#$%^&*()+=[]{}|;:,.<>?";

export const TextEncrypted: React.FC<TextEncryptedProps> = ({
  text,
  interval = 35,
}) => {
  const [outputText, setOutputText] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (outputText !== text) {
      timer = setInterval(() => {
        if (outputText.length < text.length) {
          setOutputText((prev) => prev + text[prev.length]);
        } else {
          clearInterval(timer);
        }
      }, interval);
    }

    return () => clearInterval(timer);
  }, [text, interval, outputText]);

  const remainder =
    outputText.length < text.length
      ? text
          .slice(outputText.length)
          .split("")
          .map(() => chars[Math.floor(Math.random() * chars.length)])
          .join("")
      : "";

  if (!isMounted) {
    return <span className="opacity-0">text</span>;
  }

  return (
    <span className="text-white">
      {outputText}
      {remainder}
    </span>
  );
};
