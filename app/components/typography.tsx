import { type ReactNode } from "react";
import { cn } from "~/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
};

export function H1({ children, as }: Omit<Props, "className">) {
  const Tag = as ?? "h1";

  return (
    <Tag className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      {children}
    </Tag>
  );
}

export function H2({ children, as }: Omit<Props, "className">) {
  const Tag = as ?? "h2";

  return (
    <Tag className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
      {children}
    </Tag>
  );
}

export function P({ children, className }: Omit<Props, "as">) {
  return (
    <p className={cn("leading-7 not-first:mt-6", className)}>
      {children}
    </p>
  );
}
