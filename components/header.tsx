"use client";

import { ExitIcon } from "@radix-ui/react-icons";
import { Menu, SquareLibrary } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { FaUser } from "react-icons/fa";

import { LogoutButton } from "@/components/auth/logout-button";
import { ThemeModeToggle } from "@/components/theme-mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { useCurrentUser } from "@/hooks/use-current-user";

export const Header = () => {
  const { data: session } = useSession();
  const user = useCurrentUser();
  const pathname = usePathname();

  return (
    <div className="flex w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="/"
            className="flex items-center gap-2 whitespace-nowrap text-lg font-semibold md:text-base"
          >
            <SquareLibrary className="size-6" />
            <span className="font-bold">Meta Fandom</span>
          </Link>
          <Link
            href="/video-games"
            className={`whitespace-nowrap transition-colors hover:text-foreground ${pathname === "/video-games" ? "text-foreground" : "text-muted-foreground"}`}
          >
            Video Games
          </Link>
          <Link
            href="/pokemon"
            className={`whitespace-nowrap transition-colors hover:text-foreground ${pathname === "/pokemon" ? "text-foreground" : "text-muted-foreground"}`}
          >
            Pokemon
          </Link>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="size-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="/"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <SquareLibrary className="size-6" />
                <span className="font-bold">Meta Fandom</span>
              </Link>
              <Link
                href="/video-games/video-games"
                className={`whitespace-nowrap transition-colors hover:text-foreground ${pathname === "/video-games" ? "text-foreground" : "text-muted-foreground"}`}
              >
                Video Games
              </Link>
              <Link
                href="/pokemon"
                className={`whitespace-nowrap transition-colors hover:text-foreground ${pathname === "/pokemon" ? "text-foreground" : "text-muted-foreground"}`}
              >
                Pokemon
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="ml-auto flex-1 sm:flex-initial" />
          <div className="flex items-center gap-4">
            <span className="font-medium">
              {session
                ? `Welcome, ${user?.name || "User"}!`
                : "Welcome, Guest!"}
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src={user?.image || ""} />
                  <AvatarFallback className="border">
                    <FaUser className="text-white" />
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {session ? (
                  <>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link href="/settings">Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <LogoutButton>
                      <DropdownMenuItem>
                        <ExitIcon className="mr-2 size-4" />
                        Logout
                      </DropdownMenuItem>
                    </LogoutButton>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem>
                      <Link href="/auth/register">Register</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/auth/login">Login</Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <ThemeModeToggle />
        </div>
      </header>
    </div>
  );
};
