"use client";

import { useState, useEffect } from "react";

/* --- SearchBar Component --- */
const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className={`relative flex items-center transition-all duration-300 ${
        isFocused ? "w-48 md:w-64 lg:w-80" : "w-32 md:w-40 lg:w-48"
      }`}
    >
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-full 
                   text-sm text-white placeholder-gray-400 focus:outline-none 
                   focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 
                   transition-all duration-300"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="h-4 w-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <svg
              className="h-4 w-4 text-gray-400 hover:text-cyan-300 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

/* --- ButtonGroup Component --- */
const ButtonGroup = ({
  buttons,
  classes = "",
}: {
  buttons: { label: string; link: string }[];
  classes?: string;
}) => {
  return (
    <div className={classes}>
      {buttons.map((button, index) => (
        <a
          key={index}
          href={button.link}
          className="relative px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 
                   group hover:text-cyan-300"
        >
          {button.label}
          <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 
                          transform origin-bottom scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
        </a>
      ))}
    </div>
  );
};

/* --- ButtonIcon Component --- */
const ButtonIcon = ({
  icon,
  classes = "",
  onClick,
}: {
  icon: React.ReactNode;
  classes?: string;
  onClick: () => void;
}) => {
  return (
    <button
      className={`relative p-2 rounded-full bg-gray-800 hover:bg-gray-750 transition-all duration-300 
                border border-gray-600 hover:border-cyan-500/30 ${classes}`}
      onClick={onClick}
    >
      <div className="relative z-10">{icon}</div>
      <span className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 
                      opacity-0 transition-opacity duration-300 hover:opacity-100"></span>
    </button>
  );
};

/* --- PopoverModal Component --- */
const PopoverModal = ({
  title,
  show,
  onClose,
  children,
}: {
  title: string;
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (show) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [show, onClose]);

  if (!show) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={onClose}
      ></div>

      <div className="fixed top-16 right-4 md:right-6 z-50 animate-fade-in">
        <div
          className="relative bg-gray-800 border border-cyan-500/30 rounded-xl shadow-2xl 
                      shadow-cyan-500/10 overflow-hidden w-48"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent"></div>

          <div className="p-2 border-b border-gray-700/50 relative">
            <h3 className="text-sm font-semibold text-cyan-300">{title}</h3>
          </div>

          <div className="relative">{children}</div>
        </div>
      </div>
    </>
  );
};

/* --- Sidebar Component (Mobile Navigation) --- */
const SideBar = ({
  show,
  onClose,
}: {
  show: boolean;
  onClose: () => void;
}) => {
  return (
    <div
      className={`fixed inset-0 z-50 transition-transform duration-500 md:hidden ${
        show ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Sidebar content */}
      <div className="absolute left-0 top-0 bottom-0 w-64 bg-gray-900 shadow-xl border-r border-cyan-500/30 p-6 flex flex-col space-y-6">
        <h2 className="text-lg font-bold text-cyan-300">Navigation</h2>

        <nav className="flex flex-col space-y-4">
          <a
            href="/"
            className="text-white hover:text-cyan-300 transition-colors"
            onClick={onClose}
          >
            Home
          </a>
          <a
            href="/events"
            className="text-white hover:text-cyan-300 transition-colors"
            onClick={onClose}
          >
            Events
          </a>
          <a
            href="/notifications"
            className="text-white hover:text-cyan-300 transition-colors"
            onClick={onClose}
          >
            Notifications
          </a>
          <a
            href="/profile"
            className="text-white hover:text-cyan-300 transition-colors"
            onClick={onClose}
          >
            Profile
          </a>
        </nav>
      </div>
    </div>
  );
};

/* --- Main Header Component --- */
export default function Header() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNavMenu, setShowNavMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`
      fixed top-0 left-0 right-0 z-40 transition-all duration-500
      flex items-center justify-between p-4
      ${
        isScrolled
          ? "bg-gray-900/95 backdrop-blur-md border-b border-cyan-500/20 shadow-xl"
          : "bg-gradient-to-b from-gray-900 to-gray-900/80"
      }
    `}
    >
      {/* Logo */}
      <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
        StreamX
      </h1>

      {/* Searchbar */}
      <div className="flex-1 max-w-md mx-4">
        <SearchBar />
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex">
        <ButtonGroup
          buttons={[
            { label: "Home", link: "/" },
            { label: "Events", link: "/events" },
            { label: "Notifications", link: "/notifications" },
          ]}
          classes="flex space-x-1"
        />
      </div>

      {/* Mobile menu + User menu */}
      <div className="flex items-center space-x-3">
        <div className="md:hidden">
          <ButtonIcon
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            }
            onClick={() => setShowNavMenu(true)}
          />
          <SideBar show={showNavMenu} onClose={() => setShowNavMenu(false)} />
        </div>

        <ButtonIcon
          icon={<span role="img" aria-label="User">👤</span>}
          onClick={() => setShowUserMenu(true)}
        />
      </div>

      {/* User Menu */}
      <PopoverModal
        title="User Menu"
        show={showUserMenu}
        onClose={() => setShowUserMenu(false)}
      >
        <div className="divide-y divide-gray-700/50">
          <a
            href="/profile"
            className="block px-4 py-3 text-sm transition-colors duration-200 hover:bg-cyan-500/10 hover:text-cyan-300"
          >
            Profile
          </a>
          <a
            href="/settings"
            className="block px-4 py-3 text-sm transition-colors duration-200 hover:bg-cyan-500/10 hover:text-cyan-300"
          >
            Settings
          </a>
          <a
            href="/logout"
            className="block px-4 py-3 text-sm transition-colors duration-200 hover:bg-cyan-500/10 hover:text-cyan-300"
          >
            Logout
          </a>
        </div>
      </PopoverModal>
    </header>
  );
}
