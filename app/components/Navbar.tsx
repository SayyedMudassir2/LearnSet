'use client';

import React, { useEffect, useState, useCallback, useRef, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { 
  Menu, X, Upload, Sun, Moon, ChevronDown, User,
  HelpCircle, FileText, Info, Shield, LogOut, LayoutDashboard,
  Sparkles
} from "lucide-react"; 
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

// --- Types & Constants ---
interface NavItem {
  name: string;
  href: string;
  icon?: React.ElementType;
  isSpecial?: boolean;
}

// --- Framer Motion Variants ---
const dropdownVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 10, 
    scale: 0.95, 
    pointerEvents: 'none' 
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    pointerEvents: 'auto',
    transition: { 
      type: "spring",
      stiffness: 300, 
      damping: 20 
    }
  },
  exit: { 
    opacity: 0, 
    y: 5, 
    scale: 0.98, 
    transition: { duration: 0.1 }
  }
};

const mobileMenuVariants: Variants = {
  closed: { 
    x: "100%", 
    transition: { 
      type: "spring", 
      stiffness: 400, 
      damping: 40 
    } 
  },
  open: { 
    x: 0, 
    transition: { 
      type: "spring", 
      stiffness: 400, 
      damping: 40 
    } 
  }
};

// --- Custom Theme Hook ---
function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") as "light" | "dark";
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

function useClickOutside(ref: React.RefObject<HTMLElement | null>, handler: () => void) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler();
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme, mounted } = useTheme();
  const { user, isAdmin, logout } = useAuth();

  // Menu States
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  
  const moreTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const profileTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const navLinks = useMemo<NavItem[]>(() => [
    { name: "Home", href: "/" },
    { name: "Study Materials", href: "/study-materials" },
    { name: "PYQs", href: "/pyqs" },
  ], []);

  const moreLinks = useMemo<NavItem[]>(() => [
    { name: "About Us", href: "/about", icon: Info },
    { name: "Contact Us", href: "/contact", icon: HelpCircle },
    { name: "FAQ", href: "/faq", icon: HelpCircle },
    { name: "Privacy Policy", href: "/privacy-policy", icon: Shield },
    { name: "Terms of Service", href: "/terms", icon: FileText },
  ], []);

  const closeAllMenus = useCallback(() => {
    setMobileOpen(false);
    setIsMoreOpen(false);
    setProfileOpen(false);
    document.body.style.overflow = "unset";
  }, []);

  // Sync state with Navigation & handle resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) { // lg breakpoint
        closeAllMenus();
      }
    };
    window.addEventListener('resize', handleResize);
    closeAllMenus(); // Close on path change

    return () => window.removeEventListener('resize', handleResize);
  }, [pathname, closeAllMenus]);

  // Handle Scroll Locking for Mobile
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "unset";
  }, [mobileOpen]);

  const profileMenuRef = useRef<HTMLDivElement>(null);
  const mobileProfileMenuRef = useRef<HTMLDivElement>(null);
  
  useClickOutside(profileMenuRef, () => setProfileOpen(false));
  useClickOutside(mobileProfileMenuRef, () => setProfileOpen(false));

  if (!mounted) return <div className="h-16 sm:h-20 border-b bg-background/50 animate-pulse" />;

  const ProfileDropdown = () => (
    <div className="bg-popover border border-border/50 rounded-2xl shadow-2xl p-2">
      <div className="px-3 py-2 mb-1">
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Account</p>
        <p className="text-sm font-medium truncate">{user?.email}</p>
      </div>
      <Separator className="mb-1 opacity-50" />
      {isAdmin && (
        <Link href="/admin" onClick={closeAllMenus} className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm hover:bg-accent transition-colors">
          <LayoutDashboard size={16} /> Admin Panel
        </Link>
      )}
      <Link href="/profile" onClick={closeAllMenus} className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm hover:bg-accent transition-colors">
        <User size={16} /> My Profile
      </Link>
      <button 
        onClick={() => { logout(); closeAllMenus(); }}
        className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-rose-500 hover:bg-rose-500/10 transition-colors"
      >
        <LogOut size={16} /> Logout
      </button>
    </div>
  );

  return (
    <>
      <nav 
        className="fixed top-0 left-0 w-full z-50 bg-background/80 dark:bg-[#090a0c]/80 backdrop-blur-xl border-b border-border/40 transition-all duration-300"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            
            <Link href="/" onClick={closeAllMenus} className="flex items-center gap-2 group outline-none">
              <div className="relative w-10 h-10 transition-transform duration-500 group-hover:rotate-[360deg]">
                <Image
                  src={theme === "dark" ? "/logo/logo-dark.png" : "/logo/logo-light.png"}
                  alt="LearnSet"
                  fill
                  className="object-contain"
                  sizes="40px"
                  priority
                />
              </div>
              <span className="font-black text-2xl tracking-tighter hidden sm:block bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/60">
                LearnSet
              </span>
            </Link>

            <ul className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={cn(
                      "relative px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300",
                      pathname === link.href 
                        ? "text-primary" 
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                    )}
                  >
                    {link.name}
                    {pathname === link.href && (
                      <motion.div layoutId="nav-underline" className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
                    )}
                  </Link>
                </li>
              ))}

              <li 
                className="relative"
                onMouseEnter={() => {
                  if (moreTimeoutRef.current) clearTimeout(moreTimeoutRef.current);
                  setIsMoreOpen(true);
                }}
                onMouseLeave={() => {
                  moreTimeoutRef.current = setTimeout(() => setIsMoreOpen(false), 150);
                }}
              >
                <button className={cn(
                  "flex items-center gap-1 px-4 py-2 rounded-full text-sm font-semibold transition-colors outline-none",
                  isMoreOpen ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"
                )}>
                  More <ChevronDown className={cn("h-4 w-4 transition-transform duration-300", isMoreOpen && "rotate-180")} />
                </button>

                <AnimatePresence>
                  {isMoreOpen && (
                    <motion.div 
                      variants={dropdownVariants}
                      initial="hidden" animate="visible" exit="exit"
                      className="absolute right-0 top-full pt-3 w-60"
                    >
                      <div className="bg-popover border border-border/50 rounded-2xl shadow-2xl p-2 backdrop-blur-2xl">
                        {moreLinks.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            onClick={closeAllMenus}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-all group"
                          >
                            <div className="p-1.5 rounded-lg bg-muted group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                              {item.icon && <item.icon size={16} />}
                            </div>
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            </ul>

            <div className="hidden md:flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full hover:bg-primary/5">
                <AnimatePresence mode="wait">
                  {theme === "dark" ? (
                    <motion.div key="sun" initial={{ scale: 0, rotate: 90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: -90 }}><Sun size={20} /></motion.div>
                  ) : (
                    <motion.div key="moon" initial={{ scale: 0, rotate: 90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: -90 }}><Moon size={20} /></motion.div>
                  )}
                </AnimatePresence>
              </Button>

              <div className="h-8 w-[1px] bg-border/40 mx-2" />

              {user ? (
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="hidden xl:flex rounded-full border-border/40 hover:bg-accent transition-all" asChild>
                    <Link href="/upload-notes"><Upload className="h-4 w-4 mr-2 text-primary" /> Upload</Link>
                  </Button>
                  
                  <Button variant="default" size="sm" className="rounded-full shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95" asChild>
                    <Link href="/ask-ai"><Sparkles className="h-4 w-4 mr-2" /> Ask AI</Link>
                  </Button>

                  <div 
                    className="relative ml-2"
                    ref={profileMenuRef}
                    onMouseEnter={() => {
                      if (window.innerWidth >= 768) {
                        if (profileTimeoutRef.current) clearTimeout(profileTimeoutRef.current);
                        setProfileOpen(true);
                      }
                    }}
                    onMouseLeave={() => {
                      if (window.innerWidth >= 768) {
                        profileTimeoutRef.current = setTimeout(() => setProfileOpen(false), 150);
                      }
                    }}
                  >
                    <div className="p-0.5 rounded-full bg-gradient-to-tr from-primary/50 to-purple-500/50">
                      <Button variant="secondary" size="icon" className="rounded-full border-2 border-background" onClick={() => setProfileOpen(!profileOpen)}>
                        <User size={20} />
                      </Button>
                    </div>

                    <AnimatePresence>
                      {profileOpen && (
                        <motion.div 
                          variants={dropdownVariants}
                          initial="hidden" animate="visible" exit="exit"
                          className="absolute right-0 top-full pt-3 w-52"
                        >
                          <ProfileDropdown />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="rounded-full" asChild><Link href="/login">Login</Link></Button>
                  <Button variant="default" size="sm" className="rounded-full px-6" asChild><Link href="/register">Sign Up</Link></Button>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 md:hidden">
              {user && (
                <div className="relative mr-1" ref={mobileProfileMenuRef}>
                  <div className="p-0.5 rounded-full bg-gradient-to-tr from-primary/50 to-purple-500/50">
                    <Button variant="secondary" size="icon" className="rounded-full border-2 border-background w-8 h-8 sm:w-10 sm:h-10" onClick={() => setProfileOpen(!profileOpen)}>
                      <User size={18} />
                    </Button>
                  </div>
                  <AnimatePresence>
                    {profileOpen && (
                      <motion.div 
                        variants={dropdownVariants}
                        initial="hidden" animate="visible" exit="exit"
                        className="absolute right-0 top-full pt-3 w-52"
                      >
                        <ProfileDropdown />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
              <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </Button>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 text-foreground/80 hover:text-foreground transition-transform active:scale-90"
              >
                {mobileOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div 
            variants={mobileMenuVariants}
            initial="closed" animate="open" exit="closed"
            className="fixed inset-0 z-[45] bg-background lg:hidden overflow-y-auto"
          >
            <div className="flex flex-col pt-24 pb-12 px-8 h-full">
              <div className="space-y-6">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em]">Menu</p>
                {navLinks.map(link => (
                  <Link key={link.name} href={link.href} onClick={closeAllMenus} className="block text-4xl font-black tracking-tighter hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="mt-12 space-y-4">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em]">Platform</p>
                <div className="grid grid-cols-1 gap-3">
                  <Button size="lg" className="w-full justify-start gap-4 rounded-2xl h-16 text-lg" asChild>
                    <Link href="/askwithai"><Sparkles /> Ask with AI</Link>
                  </Button>
                  <Button size="lg" variant="outline" className="w-full justify-start gap-4 rounded-2xl h-16 text-lg" asChild>
                    <Link href="/upload-notes"><Upload /> Upload Notes</Link>
                  </Button>
                </div>
              </div>

              <div className="mt-auto pt-12 grid grid-cols-2 gap-4">
                {moreLinks.slice(0, 4).map(link => (
                  <Link key={link.name} href={link.href} onClick={closeAllMenus} className="text-sm font-semibold text-muted-foreground hover:text-foreground">
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
