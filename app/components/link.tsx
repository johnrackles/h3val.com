import { Link as RemixLink } from "@remix-run/react";
import { type RemixLinkProps } from "@remix-run/react/dist/components";
import { cn } from "~/lib/utils";

export const linkStyles = (className?: string) =>
  cn("font-medium text-primary underline underline-offset-4", className);

export function Link({ children, className, ...props }: RemixLinkProps) {
  return (
    <RemixLink {...props} className={linkStyles(className)}>
      {children}
    </RemixLink>
  );
}
