"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  Menu, 
  X, 
  Lightbulb, 
  Upload, 
  Sun, 
  Moon, 
  ChevronDown, 
  ChevronUp,
  User,
  HelpCircle,
  FileText,
  Info,
  Shield
} from "lucide-react"; 
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils"; // Assuming you have a cn utility, if not, standard template literals work

/* -------------------------------------------
   1. Data Modeling & Strategy
   Centralizing data allows for easier updates 
   without touching the render logic.
------------------------------------------- */

interface NavItem {
  name: string;
  href: string;
  icon?: React.ElementType; // Optional icon for mobile/rich menus
}

const NAV_LINKS: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "Study Materials", href: "/study-materials" },
  { name: "PYQs", href: "/pyqs" },
];

const MORE_LINKS: NavItem[] = [
  { name: "About Us", href: "/about", icon: Info },
  { name: "Contact Us", href: "/contact", icon: HelpCircle },
  { name: "FAQ", href: "/faq", icon: HelpCircle },
  { name: "Privacy Policy", href: "/privacy-policy", icon: Shield },
  { name: "Terms of Service", href: "/terms", icon: FileText },
];

const ACTION_BUTTONS = [
  { name: "Upload Notes", href: "/upload-notes", icon: Upload, variant: "outline" },
  { name: "Login", href: "/login", icon: User, variant: "ghost" }, // UX: 'Login' usually needs less visual weight than the CTA
  { name: "Ask with AI", href: "/ask-ai", icon: Lightbulb, variant: "default" },
] as const;

/* -------------------------------------------
   2. Custom Hooks
------------------------------------------- */

/**
 * Enhanced Theme Hook
 * Prevents hydration mismatch (flickering) and handles system preference.
 */
function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") as "light" | "dark";
    // Strategy: Fallback to system preference if no save exists, otherwise default to dark
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme || (systemPrefersDark ? "dark" : "light");
    
    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  }, [theme]);

  return { theme, toggleTheme, mounted };
}

/* -------------------------------------------
   3. Sub-Components (Modular Design)
------------------------------------------- */

const isActive = (pathname: string, href: string) =>
  pathname === href || (pathname.startsWith(href) && href !== "/");

const Logo = ({ theme }: { theme: string }) => (
  <Link 
    href="/" 
    className="flex items-center gap-2 group focus:outline-none rounded-md" 
    aria-label="LearnSet Home"
  >
    <div className="relative w-10 h-10 transition-transform duration-300 group-hover:scale-105">
      {/* Strategy: Use exact sizing to prevent layout shift */}
      <Image
        src={theme === "dark" ? "/logo/logo-dark.png" : "/logo/logo-light.png"}
        alt="LearnSet Logo"
        fill
        className="object-contain"
        sizes="(max-width: 768px) 40px, 48px"
        priority
      />
    </div>
    <span className="font-bold text-xl tracking-tight hidden sm:block text-foreground">
      LearnSet
    </span>
  </Link>
);

const DesktopMenu = ({ pathname }: { pathname: string }) => {
  const isMoreActive = MORE_LINKS.some((l) => isActive(pathname, l.href));

  return (
    <ul className="hidden md:flex items-center gap-1">
      {NAV_LINKS.map((link) => (
        <li key={link.name}>
          <Link
            href={link.href}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              isActive(pathname, link.href)
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            }`}
          >
            {link.name}
          </Link>
        </li>
      ))}

      {/* Dropdown Strategy: Focus-within allows keyboard users to keep menu open */}
      <li className="relative group ml-1" tabIndex={0}>
        <button
          className={`flex items-center gap-1 px-3 py-2 rounded-full text-sm font-medium transition-colors ${
            isMoreActive ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
          }`}
          aria-haspopup="true"
        >
          More <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:-rotate-180" />
        </button>

        <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-200 transform origin-top-right z-50">
          <ul className="w-56 bg-background/95 backdrop-blur-md border border-border rounded-xl shadow-lg p-2 flex flex-col gap-1">
            {MORE_LINKS.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                      isActive(pathname, item.href)
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-foreground/80 hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    {Icon && <Icon className="h-4 w-4 opacity-70" />}
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </li>
    </ul>
  );
};

/* -------------------------------------------
   4. Main Navbar Component
------------------------------------------- */

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme, mounted } = useTheme();

  // UX: Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setMobileMoreOpen(false);
  }, [pathname]);

  // Accessibility: Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileOpen]);

  // Avoid rendering theme-dependent UI until mounted to prevent hydration errors
  if (!mounted) return <div className="h-16 border-b bg-background" />; 

  return (
    <>
      <nav
        className="fixed top-0 left-0 w-full z-50 bg-background/80 dark:bg-[#0f1115]/80 backdrop-blur-xl border-b border-border/40 transition-all duration-300"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            
            {/* 1. Brand Identity */}
            <Logo theme={theme} />

            {/* 2. Desktop Navigation (Center) */}
            <DesktopMenu pathname={pathname} />

            {/* 3. Desktop Actions (Right) */}
            <div className="hidden md:flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="rounded-full text-muted-foreground hover:text-foreground"
                aria-label="Toggle Theme"
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              
              <div className="h-6 w-px bg-border/60 mx-1" /> {/* Divider */}

              {ACTION_BUTTONS.map(({ name, href, icon: Icon, variant }) => (
                <Button 
                  key={name} 
                  variant={variant as any} 
                  size={variant === "default" ? "default" : "sm"}
                  asChild 
                  className={variant === "default" ? "shadow-md shadow-primary/20" : ""}
                >
                  <Link href={href} className="flex items-center gap-2">
                    {Icon && <Icon className="h-4 w-4" />}
                    {name}
                  </Link>
                </Button>
              ))}
            </div>

            {/* 4. Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-foreground/80 hover:text-foreground focus:outline-none"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* -------------------------------------------
          5. Mobile Menu Overlay
          Strategy: Separate from nav flow to handle z-index and scrolling perfectly
      ------------------------------------------- */}
      <div
        className={`fixed inset-0 z-40 bg-background/95 backdrop-blur-xl pt-20 px-6 transition-transform duration-300 ease-in-out md:hidden flex flex-col ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full overflow-y-auto pb-10">
          {/* Mobile Links */}
          <nav className="space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center justify-between p-3 rounded-xl text-lg font-medium transition-colors ${
                  isActive(pathname, link.href)
                    ? "bg-primary/10 text-primary"
                    : "text-foreground/80 hover:bg-muted"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Mobile Accordion for 'More' */}
            <div className="pt-2">
              <button
                onClick={() => setMobileMoreOpen(!mobileMoreOpen)}
                className="w-full flex items-center justify-between p-3 rounded-xl text-lg font-medium text-foreground/80 hover:bg-muted"
              >
                More 
                {mobileMoreOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  mobileMoreOpen ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0"
                }`}
              >
                <div className="pl-4 space-y-1 border-l-2 border-border/50 ml-3">
                  {MORE_LINKS.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block p-2 text-base text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* Mobile Footer Actions */}
          <div className="mt-auto pt-8 space-y-4">
            <div className="flex items-center justify-between px-3 py-4 bg-muted/30 rounded-xl border border-border/50">
              <span className="text-sm font-medium">Appearance</span>
              <div className="flex bg-background rounded-full p-1 border border-border">
                <button
                  onClick={() => theme !== "light" && toggleTheme()}
                  className={`p-2 rounded-full transition-all ${theme === "light" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground"}`}
                >
                  <Sun className="h-4 w-4" />
                </button>
                <button
                  onClick={() => theme !== "dark" && toggleTheme()}
                  className={`p-2 rounded-full transition-all ${theme === "dark" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground"}`}
                >
                  <Moon className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="grid gap-3">
               {ACTION_BUTTONS.map(({ name, href, icon: Icon, variant }) => (
                <Button 
                  key={name} 
                  variant={variant as any} 
                  size="lg" 
                  className="w-full justify-center gap-2"
                  asChild
                >
                  <Link href={href}>
                    {Icon && <Icon className="h-5 w-5" />}
                    {name}
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}