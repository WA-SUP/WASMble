"use client";

import { useEffect, useRef } from "react";
import ArgsInput from "@components/argsInput/ArgsInput";

interface ArgsInputListProps {
  args: string[];
  setArgs: (args: string[]) => void;
}

export default function ArgsInputList({
  args,
  setArgs,
}: ArgsInputListProps): React.JSX.Element {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      requestAnimationFrame(() => {
        scrollRef.current!.scrollTop = scrollRef.current!.scrollHeight;
      });
    }
  }, [args]);

  const handleRemoveArg = (index: number) => {
    setArgs(args.filter((_, i) => i !== index));
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
