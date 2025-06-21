"use client";

import Link from "next/link";
import {
  PaintBucket,
  User,
  LogIn,
  LogOut,
  LayoutDashboard,
  Menu,
  ShoppingCart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import * as React from "react";
import { useAuth } from "@/context/auth-context";
import { useCart } from "@/context/cart-context";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "./ui/skeleton";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Paints" },
  { href: "/services", label: "Services" },
  { href: "/visualizer", label: "Visualizer" },
  { href: "/request-estimation", label: "Get Estimate" },
];

export function Header() {
  const { user, logout, isLoading } = useAuth();
  const { cartCount } = useCart();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  }

  const UserMenu = () => {
    if (isLoading) {
      return <Skeleton className="h-10 w-10 rounded-full" />;
    }

    return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          <User className="h-5 w-5" />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{user ? user.name : "My Account"}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {user ? (
          <>
            <DropdownMenuItem asChild>
              <Link href="/account">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                <span>Account</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuItem asChild>
             <Link href="/login">
                <LogIn className="mr-2 h-4 w-4" />
                <span>Log In</span>
             </Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

  const CartButton = () => (
    <Button asChild variant="ghost" size="icon" className="relative">
      <Link href="/cart">
        <ShoppingCart className="h-5 w-5" />
        {cartCount > 0 && (
          <Badge className="absolute -top-2 -right-2 h-5 w-5 justify-center p-0">{cartCount}</Badge>
        )}
        <span className="sr-only">View cart</span>
      </Link>
    </Button>
  );
  
  const NavLinks = ({className}: {className?: string}) => (
     <nav className={cn("items-center space-x-4 lg:space-x-6", className)}>
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === link.href
                ? "text-primary"
                : "text-muted-foreground"
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <PaintBucket className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block font-headline">
              First Impression
            </span>
          </Link>
          <NavLinks className="hidden md:flex"/>
        </div>
        
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
               <SheetHeader>
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <SheetDescription className="sr-only">Main navigation menu for the mobile site.</SheetDescription>
              </SheetHeader>
               <Link href="/" className="mr-6 flex items-center space-x-2 mb-6">
                <PaintBucket className="h-6 w-6 text-primary" />
                <span className="font-bold font-headline">
                  First Impression
                </span>
              </Link>
              <NavLinks className="flex flex-col space-y-4 space-x-0 items-start"/>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2">
          <CartButton />
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
