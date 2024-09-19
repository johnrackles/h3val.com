import { Link } from "@remix-run/react";

export function Header() {
  return (
    <header className="border-b border-muted">
      <div className="container mx-auto p-4 lg:p-8">
        <Link to="/" className="font-semibold tracking-tight lg:text-2xl">
          H3VAL
        </Link>
      </div>
    </header>
  );
}
