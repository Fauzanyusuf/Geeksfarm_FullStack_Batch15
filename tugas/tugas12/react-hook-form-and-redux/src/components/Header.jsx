import { Link } from "react-router";

const links = [
  { linkName: "Home", linkURL: "/" },
  { linkName: "Counter", linkURL: "/counter" },
  { linkName: "Form", linkURL: "/form" },
  { linkName: "Contact", linkURL: "/contact" },
  { linkName: "Youtube", linkURL: "/youtube" },
];

export default function Header() {
  return (
    <header className="p-4 shadow-md">
      <nav className="container flex items-center justify-between mx-auto">
        <Link to="/" className="text-lg font-bold">
          Fauzan Application
        </Link>
        <div className="space-x-4">
          {links.map((link, index) => (
            <Link
              key={index}
              to={link.linkURL}
              className="transition hover:text-gray-700"
            >
              {link.linkName}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
