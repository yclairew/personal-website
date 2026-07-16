"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useLocale } from "@/lib/i18n/Locale_context";
import LanguageSwitcher from "@/components/Language_switcher";

const Nav = () => {
    const { t } = useLocale();
    const [isOpen, setIsOpen] = useState(false);

    const menuRef = useRef(null);
    const buttonRef = useRef(null);

    const navLinks = [
        { href: "/", label: t.nav_about },
        { href: "/portfolio", label: t.nav_portfolio },
        { href: "/coursework", label: t.nav_coursework },
        { href: "/service", label: t.nav_service },
        { href: "/Claire Wu Resume.pdf#view=Fit", label: t.nav_resume, target: "_blank" },
    ];

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        }

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    return (
        <nav className="pb-3 pt-3 bg-accent-light border-b-2 border-accent-light shadow-sm align-center font-[Montserrat] relative">
            <div className="flex w-full items-center justify-between">
                <div className="flex gap-6 ml-4 lg:ml-6 xl:ml-15 items-center">
                    <Link href="/" className="nav-underline no-anim-link">
                        {/* <img src="icon0.svg" className="w-12 h-auto"/> */}

                        {/* for hosting on people.tamu.edu */}
                        <img src="/~y.clairewu/icon0.svg" className="w-12 h-auto" alt="favicon"/>
                    </Link>
                    <div className="bg-accent-light">
                        <LanguageSwitcher />
                    </div>
                </div>

                {/* desktop links */}
                <div className="hidden md:flex gap-5 lg:gap-6 mr-4 lg:mr-6 xl:mr-15 lg:items-center">
                    {navLinks.map(link => (
                        <Link
                            key={link.href}
                            className="nav-bar-text text-lg lg:text-xl text-center text-link leading-none nav-underline no-anim-link"
                            href={link.href}
                            target={link.target}
                            rel={link.target ? "noopener noreferrer" : undefined}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                <button
                    ref={buttonRef}
                    className="md:hidden ml-auto mr-4 lg:mr-15 flex flex-col justify-center gap-1.5 w-8 h-8"
                    onClick={() => setIsOpen(prev => !prev)}
                    aria-label="Toggle menu"
                    aria-expanded={isOpen}
                >
                    <span className={`block h-0.5 w-full bg-text transition-transform ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
                    <span className={`block h-0.5 w-full bg-text transition-opacity ${isOpen ? "opacity-0" : ""}`} />
                    <span className={`block h-0.5 w-full bg-text transition-transform ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
                </button>
            </div>

            {isOpen && (
                <div ref={menuRef} className="md:hidden flex flex-col items-center gap-4 px-15 pt-4 pb-2">
                    {navLinks.map(link => (
                        <Link
                            key={link.href}
                            className="nav-bar-text text-xl text-link leading-none no-anim-link block w-full p-1"
                            href={link.href}
                            target={link.target}
                            rel={link.target ? "noopener noreferrer" : undefined}
                            onClick={() => setIsOpen(false)}
                        >
                            <span className="nav-underline underline underline-offset-4 decoration-1 decoration-link">{link.label}</span>
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    );
};

export default Nav;