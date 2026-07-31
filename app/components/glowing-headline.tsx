import type { ReactNode } from "react";

type Props = { children: ReactNode };

export function GlowingHeadline({ children }: Props) {
  return (
    <>
      <span
        aria-hidden
        className="absolute mx-auto box-content flex select-none border bg-clip-text text-center text-5xl font-black tracking-tighter text-transparent blur-xl lg:text-9xl"
      >
        {children}
      </span>
      <h1 className="relative top-0 flex h-auto select-auto items-center justify-center bg-clip-text text-center text-5xl font-black tracking-tighter text-foreground lg:text-9xl">
        {children}
      </h1>
    </>
  );
}
