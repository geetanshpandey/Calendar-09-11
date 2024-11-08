import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ReactNode } from "react";
import prisma from "../lib/db";
import { redirect } from "next/navigation";
import Logo from "@/public/logo.png";
import Image from "next/image";
import { DasboardLinks } from "../components/dashboard/DasboardLinks";
import { ThemeToggle } from "../components/dashboard/ThemeToggle";
import { Toaster } from "@/components/ui/sonner";
import { auth, signOut } from "../lib/auth";

async function getData(id: string) {
  const data = await prisma.user.findUnique({
    where: { id },
    select: { username: true, grantId: true },
  });

  if (!data?.username) return redirect("/onboarding");
  if (!data.grantId) return redirect("/onboarding/grant-id");
  return data;
}

export default async function Dashboard({ children }: { children: ReactNode }) {
  const session = await auth();
  if (!session?.user) return redirect("/");

  const data = await getData(session.user.id as string);

  return (
    <>
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6 justify-between z-50 fixed top-0 left-0 right-0 bg-white dark:bg-gray-900">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Image src={Logo} alt="Logo" className="size-6" />
          <p className="text-xl font-bold">
            Calend<span className="text-primary">Ly</span>
          </p>
        </Link>

        {/* ThemeToggle and user profile dropdown for larger screens */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <Image
                  src={session.user.image as string}
                  alt="Profile"
                  width={20}
                  height={20}
                  className="w-full h-full rounded-full"
                />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <form className="w-full" action={async () => { "use server"; await signOut(); }} >
                  <button className="w-full text-left">Log out</button>
                </form>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Navigation toggle and ThemeToggle for mobile screens */}
        <div className="flex md:hidden items-center gap-4">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col">
              <nav className="grid gap-2 mt-10">
                <DasboardLinks />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row min-h-screen pt-[60px]"> {/* Added padding top for main content */}
        {/* Sidebar for larger screens */}
        <div className="hidden lg:block lg:w-1/4 w-full bg-gray-100 dark:bg-gray-800 p-4">
          <nav>
            <DasboardLinks />
          </nav>
        </div>

        {/* Main Content Section */}
        <div className="flex-1 flex flex-col relative p-6">
          <main>{children}</main>
        </div>
      </div>

      <Toaster richColors closeButton />
    </>
  );
}

