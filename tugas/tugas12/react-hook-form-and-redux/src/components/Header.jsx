import { useState } from "react";
import { Link } from "react-router";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";

const links = [
  { linkName: "Home", linkURL: "/" },
  { linkName: "Counter", linkURL: "/counter" },
  { linkName: "Form", linkURL: "/form" },
  { linkName: "Contact", linkURL: "/contact" },
  { linkName: "Youtube", linkURL: "/youtube" },
];

export default function Header() {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <header className="w-full p-4 border-b shadow-md bg-background">
      <div className="container flex items-center justify-between mx-auto">
        <Link to="/" className="text-lg font-bold tracking-tight">
          Fauzan Application
        </Link>
        <nav className="items-center hidden space-x-6 md:flex ">
          {links.map((link, index) => (
            <Link
              key={index}
              to={link.linkURL}
              className="transition text-foreground hover:text-accent-foreground"
            >
              {link.linkName}
            </Link>
          ))}
        </nav>

        <div className="md:hidden">
          <Button onClick={() => setSheetOpen(true)}>
            <MenuIcon className="w-6 h-6" />
          </Button>
        </div>
      </div>

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="text-xl">Menu</SheetTitle>
          </SheetHeader>
          <nav className="grid gap-6 mx-auto text-center auto-rows-min ">
            {links.map((link, index) => (
              <Link
                key={index}
                to={link.linkURL}
                onClick={() => setSheetOpen(false)}
                className="font-semibold transition hover:font-bold"
              >
                {link.linkName}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
}
