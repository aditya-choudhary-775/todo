"use client";

import React from "react";
import TodoContextProvider from "@/context/todoContext";

export const DottedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <TodoContextProvider>
      <div className="flex min-h-screen w-full items-center justify-center bg-black bg-[radial-gradient(var(--color-neutral-700)_1px,transparent_1px)] bg-size-[10px_10px]">
        {children}
      </div>
    </TodoContextProvider>
  );
};
