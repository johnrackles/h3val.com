import {
  type LinkComponentProps,
  Link as RouterLink,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
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
      <a className={linkStyles(className)} href={to}>
        {children}
      </a>
    );
  }

  return (
    <RouterLink
      className={linkStyles(className)}
      to={to as LinkComponentProps["to"]}
      {...props}
    >
      {children}
    </RouterLink>
  );
}
