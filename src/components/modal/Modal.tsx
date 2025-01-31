"use client";

import Button from "@components/button/Button";

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  width = "w-1/2",
  height = "h-1/2",
  padding = "p-10",
}) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className={`bg-[var(--modal-background-color)] flex flex-col justify-between ${width} ${height} ${padding} border-indigo-500 rounded-lg relative`}
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          text="&times;"
          className="absolute top-2 right-2 text-white bg-transparent"
          onClick={onClose}
        />
        {title && <h1>{title}</h1>}
        <div className="flex flex-col justify-between h-full">{children}</div>
      </div>
    </div>
  );
}
