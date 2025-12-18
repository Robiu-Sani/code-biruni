"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import {
  Moon,
  Sun,
  Search,
  ChevronDown,
  Menu,
  X,
  Linkedin,
  Album,
  FolderOpenDot,
} from "lucide-react";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";
import { VscAzure, VscServerEnvironment, VscCode } from "react-icons/vsc";
import { FiUsers, FiMail } from "react-icons/fi";
import Image from "next/image";
import SearchBox from "../SearchBox";
import { usePathname } from "next/navigation";

export default function HomeNav() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // const router = useRouter()
  const pathName = usePathname()

  


  // Ensure theme is only applied after mounting to avoid hydration mismatch
  useEffect(() => {
    
    setMounted(true);
    
    // Handle scroll effect
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathName.startsWith('/dashboard')) {
  return null;
}

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const servicesItems = [
    {
      title: "Full-Stack Development",
      href: "/pages/services/fullstack",
      description: "End-to-end web application development",
      icon: <VscCode className="h-5 w-5" />,
    },
    {
      title: "MERN Stack Solutions",
      href: "/pages/services/mern",
      description: "MongoDB, Express, React, Node.js",
      icon: <VscServerEnvironment className="h-5 w-5" />,
    },
    {
      title: "Project Management",
      href: "/pages/services/project-management",
      description: "Efficient project planning and execution",
      icon: <FolderOpenDot className="h-5 w-5" />,
    },
    {
      title: "Enterprise Software",
      href: "/pages/services/enterprise",
      description: "Custom business solutions",
      icon: <VscAzure className="h-5 w-5" />,
    },
  ];

  const companyItems = [
    {
      title: "About Us",
      href: "/pages/company/about",
      description: "Our story, mission, and values",
      icon: <FiUsers className="h-5 w-5" />,
    },
    {
      title: "Our Team",
      href: "/pages/company/team",
      description: "Meet the talented people",
      icon: <FiUsers className="h-5 w-5" />,
    },
    {
      title: "Contact",
      href: "/pages/company/contact",
      description: "Get in touch with us",
      icon: <FiMail className="h-5 w-5" />,
    },
  ];

  return (
    <nav className={`fixed z-50 w-full top-0 transition-all duration-300 ${
      scrolled 
        ? "bg-background/95 backdrop-blur-md border-b shadow-sm" 
        : "bg-background/80 backdrop-blur-sm border-b"
    }`}>
      {searchOpen && <SearchBox toggleSearch={toggleSearch} />}
      <div className="container flex justify-between items-center mx-auto px-4 py-3">
        {/* Logo and Main Nav */}
        <div className="flex items-center gap-8 lg:gap-10">
          <Link href="/" className="flex items-center gap-3" onClick={closeMobileMenu}>
            <Image
              src="/logo.jpg"
              alt="Code Biruni logo"
              width={40}
              height={40}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-md transition-transform hover:scale-105"
              priority
            />
            <span className="font-bold text-xl sm:text-2xl bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Code Biruni
            </span>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:block">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink className={`${navigationMenuTriggerStyle()} font-medium`}>
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              {/* Services Dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className={`${navigationMenuTriggerStyle()} font-medium`}>
                  Services
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 w-125 lg:w-150 lg:grid-cols-2">
                    <div className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link href="/pages/services/our-services">
                          <div className="flex h-full w-full select-none flex-col justify-end rounded-md bg-linear-to-br from-primary/10 to-secondary/10 p-6 no-underline outline-none focus:shadow-md transition-all hover:shadow-lg border">
                            <div className="flex items-center gap-3 mb-4">
                              <Album className="h-12 w-12 text-primary" />
                              <div>
                                <div className="text-lg font-bold">Our Services</div>
                                <p className="text-sm text-muted-foreground mt-1">
                                  Comprehensive digital solutions
                                </p>
                              </div>
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              Tailored digital solutions to drive your business growth and success.
                            </p>
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </div>
                    {servicesItems.map((item) => (
                      <NavigationMenuLink key={item.title} asChild>
                        <Link
                          href={item.href}
                          className="block select-none space-y-1 rounded-lg p-4 leading-none no-underline outline-none transition-all hover:bg-accent hover:shadow-md focus:bg-accent"
                        >
                          <div className="flex items-center gap-3">
                            <div className="bg-primary/10 p-2 rounded-lg">
                              {item.icon}
                            </div>
                            <div>
                              <div className="text-sm font-semibold leading-none">
                                {item.title}
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Company Dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className={`${navigationMenuTriggerStyle()} font-medium`}>
                  Company
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-87.5 gap-2 p-4">
                    {companyItems.map((item) => (
                      <ListItem
                        key={item.title}
                        title={item.title}
                        href={item.href}
                        icon={item.icon}
                      >
                        {item.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/pages/projects" legacyBehavior passHref>
                  <NavigationMenuLink className={`${navigationMenuTriggerStyle()} font-medium`}>
                    Projects
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/pages/pricing" legacyBehavior passHref>
                  <NavigationMenuLink className={`${navigationMenuTriggerStyle()} font-medium`}>
                    Pricing
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link href="/pages/blog" legacyBehavior passHref>
                  <NavigationMenuLink className={`${navigationMenuTriggerStyle()} font-medium`}>
                    Blog
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search */}
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 sm:h-10 sm:w-10"
            onClick={toggleSearch}
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
          </Button>

          {/* Theme Toggle */}
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 sm:h-10 sm:w-10"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
          )}

          {/* LinkedIn */}
          <Button 
            variant="ghost" 
            size="icon"
            className="h-9 w-9 sm:h-10 sm:w-10" 
            asChild
          >
            <Link
              href="https://www.linkedin.com/company/107740161/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </Link>
          </Button>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden h-9 w-9 sm:h-10 sm:w-10"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden overflow-hidden bg-background/95 backdrop-blur-md border-t"
          >
            <div className="px-4 py-4 space-y-1">
              <MobileNavItem href="/" onClick={closeMobileMenu}>
                Home
              </MobileNavItem>

              <MobileNavDropdown
                title="Services"
                items={servicesItems}
                onItemClick={closeMobileMenu}
              />

              <MobileNavDropdown
                title="Company"
                items={companyItems}
                onItemClick={closeMobileMenu}
              />

              <MobileNavItem
                href="/pages/pricing"
                onClick={closeMobileMenu}
              >
                Pricing
              </MobileNavItem>

              <MobileNavItem
                href="/pages/blog"
                onClick={closeMobileMenu}
              >
                Blog
              </MobileNavItem>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// ListItem Component
const ListItem = ({
  title,
  href,
  children,
  icon,
}: {
  title: string;
  href: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className="flex items-start gap-4 rounded-lg p-3 hover:bg-accent transition-all duration-200 group"
        >
          {icon && (
            <div className="bg-primary/10 p-2 rounded-lg group-hover:scale-110 transition-transform">
              {icon}
            </div>
          )}
          <div className="flex-1">
            <div className="text-sm font-semibold leading-none mb-1">{title}</div>
            <p className="text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
};

// Mobile Nav Item Component
const MobileNavItem = ({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <Link
      href={href}
      className="flex items-center py-3 px-4 rounded-lg hover:bg-accent transition-colors font-medium"
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

// Mobile Nav Dropdown Component
const MobileNavDropdown = ({
  title,
  items,
  onItemClick,
}: {
  title: string;
  items: Array<{ title: string; href: string; description: string }>;
  onItemClick: () => void;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="py-1 px-4">
      <button
        className="flex items-center justify-between w-full py-3 px-4 rounded-lg hover:bg-accent transition-colors font-medium"
        onClick={() => setOpen(!open)}
      >
        {title}
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-1 space-y-1 pl-6 border-l-2 border-primary/20"
        >
          {items.map((item) => (
            <MobileNavItem
              key={item.href}
              href={item.href}
              onClick={onItemClick}
            >
              <div>
                <div className="font-medium">{item.title}</div>
                <div className="text-sm text-muted-foreground">
                  {item.description}
                </div>
              </div>
            </MobileNavItem>
          ))}
        </motion.div>
      )}
    </div>
  );
};