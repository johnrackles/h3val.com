import { Link } from "@tanstack/react-router";

export function Header() {
  return (
    <header className="border-b border-muted">
      <div className="container mx-auto flex justify-center p-4 lg:p-8">
        <Link className="font-semibold tracking-tight lg:text-2xl" to="/">
          H3VAL
        </Link>
      </div>
    </header>
  );
}
