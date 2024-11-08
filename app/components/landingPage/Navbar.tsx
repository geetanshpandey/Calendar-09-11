import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/logo.png";
import { ThemeToggle } from "../dashboard/ThemeToggle";
import { AuthModal } from "./AuthModal";

export function Navbar() {
  return (
    <div className="flex justify-between items-center py-4 px-4 lg:px-6 dark:bg-black">
      {/* Logo Section */}
      <Link href="/" className="flex items-center gap-2">
        <div className="flex items-center gap-2 mb-1">
          <Image src={Logo} className="w-10 h-10" alt="Logo" />
          <h4 className="text-3xl font-semibold">
            Calend<span className="text-primary">ly</span>
          </h4>
        </div>
      </Link>

      {/* Right Section (ThemeToggle + Try Button + Authentication Modal) */}
      <div className="flex items-center gap-4 ml-auto">
        {/* Try Button */}

        {/* ThemeToggle (for all screen sizes) */}
        <ThemeToggle />

        {/* Authentication Modal */}
        <AuthModal />
      </div>
    </div>
  );
}
