import { Link as RouterLink, type LinkComponentProps } from "@tanstack/react-router";
import { type ReactNode } from "react";
import { cn } from "~/lib/utils";

export const linkStyles = (className?: string) =>
  cn("font-medium text-primary underline underline-offset-4", className);

type Props = Omit<LinkComponentProps, "children" | "to"> & {
  children: ReactNode;
  to: string;
};

export function Link({ children, className, to, ...props }: Props) {
  const isExternal = /^(https?:)?\/\//.test(to) || to.startsWith("mailto:");

  if (isExternal) {
    return (
      <a href={to} className={linkStyles(className)}>
        {children}
      </a>
    );
  }

  return (
    <RouterLink
      to={to as LinkComponentProps["to"]}
      className={linkStyles(className)}
      {...props}
    >
      {children}
    </RouterLink>
  );
}
