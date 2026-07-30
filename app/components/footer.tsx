import { Link } from "./link";

const footerLinks = [
  { href: "/about", name: "About" },
  { href: "/contact", name: "Contact" },
];

export function Footer() {
  return (
    <footer className="space-y-4 border-t border-muted p-4 text-center text-sm lg:p-8">
      <nav className="">
        <ul className="flex justify-center space-x-4">
          {footerLinks.map((link) => (
            <li key={link.name}>
              <Link to={link.href} className="no-underline hover:underline">
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="text-muted-foreground">
        © {new Date().getFullYear()} H3VAL.com
      </div>
    </footer>
  );
}
