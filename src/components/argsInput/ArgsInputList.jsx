"use client";

import { useEffect, useRef } from "react";
import ArgsInput from "@components/ArgsInput/ArgsInput";

export default function ArgsInputList({ args, setArgs }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      requestAnimationFrame(() => {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      });
    }
  }, [args]);

  useEffect(() => {
    const inputs = document.querySelectorAll(".input-item");
    inputs.forEach((input) => {
      input.style.opacity = "0";
      requestAnimationFrame(() => {
        input.style.transition = "opacity 0.5s ease-in-out";
        input.style.opacity = "1";
      });
    });
  }, [args]);

  const handleRemoveArg = (index) => {
    const inputItem = document.querySelectorAll(".input-item")[index];
    if (inputItem) {
      inputItem.style.transition = "opacity 0.5s ease-in-out";
      inputItem.style.opacity = "0";

      setTimeout(() => {
        setArgs(args.filter((_, i) => i !== index));
      }, 200);
    }
  };

  return (
    <div ref={scrollRef} className="overflow-y-auto h-4/6 pr-4">
      {args.map((arg, index) => (
        <ArgsInput
          key={index}
          value={arg}
          index={index}
          onRemove={handleRemoveArg}
        />
      ))}
    </div>
  );
}
