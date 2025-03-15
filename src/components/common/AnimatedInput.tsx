"use client";
import React, { useState, useEffect } from "react";
import { Input } from "../ui/input";

export const AnimatedInput = ({
  placeholder: passedPlaceholder = "",
  ...passedProps
}: React.InputHTMLAttributes<HTMLInputElement>) => {
  const [placeholder, setPlaceholder] = useState(passedPlaceholder.slice(0, 0));
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const intr = setInterval(() => {
      setPlaceholder(passedPlaceholder.slice(0, placeholderIndex));
      if (placeholderIndex + 1 > passedPlaceholder.length) {
        setPlaceholderIndex(0);
        setIsPaused(true);
        setTimeout(() => setIsPaused(false), 3000);
      } else {
        setPlaceholderIndex(placeholderIndex + 1);
      }
    }, 200);

    return () => {
      clearInterval(intr);
    };
  }, [placeholderIndex, passedPlaceholder, isPaused]);

  return <Input {...passedProps} placeholder={placeholder} />;
};
