import { Link } from "react-router";

export default function Header() {
  return (
    <header className="p-4 shadow-md bg-primary text-primary-foreground">
      <nav className="container flex items-center justify-between mx-auto">
        <Link to="/" className="text-lg font-bold">
          Contact Application
        </Link>
        <div className="space-x-4">
          <Link to="/" className="transition hover:text-gray-300">
            Home
          </Link>
          <Link to="/contacts" className="transition hover:text-gray-300">
            Contacts
          </Link>
        </div>
      </nav>
    </header>
  );
}
