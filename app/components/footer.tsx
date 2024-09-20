import { Link } from "./link";

const footerLinks = [
  { href: "/about", name: "About" },
  { href: "/contact", name: "Contact" },
];

type Props = { authenticated: boolean };

export function Footer({ authenticated }: Props) {
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
          {/**
           * authenticated ? (
            <>
              <li>
                <Form action="/auth/logout" method="post">
                  <Button variant="link" type="submit" className="h-auto p-0">
                    Logout
                  </Button>
                </Form>
              </li>
              <li>
                <Link to="/dashboard" className="no-underline hover:underline">
                  Dashboard
                </Link>
              </li>
            </>
          ) : (
            <li>
              <Form action="/auth/auth0" method="post">
                <Button variant="link" type="submit" className="h-auto p-0">
                  Login
                </Button>
              </Form>
            </li>
          )
           */}
        </ul>
      </nav>
      <div className="text-muted-foreground">
        © {new Date().getFullYear()} H3VAL.com
      </div>
    </footer>
  );
}
