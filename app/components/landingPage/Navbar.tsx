import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/logo.png";

import { ThemeToggle } from "../dashboard/ThemeToggle";
import { AuthModal } from "./AuthModal";
export function Navbar() {
  return (
    <div>
      <div>
        <Link href="/" className="flex items-center gap-2">
          <Image src={Logo} className="size-10" alt="Logo" />

          <h4 className="text-3xl font-semibold">
            Cal<span className="text-primary">Marshal</span>
          </h4>
        </Link>
        <div className="md:hidden">
          <ThemeToggle />
        </div>
      </div>

      <nav>
        <ThemeToggle />

        <AuthModal />
      </nav>
    </div>
  );
}
