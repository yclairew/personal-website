"use client";
import Link from "next/link";
import { useLocale } from "@/lib/i18n/Locale_context";


const Nav = () => {
    const { t } = useLocale();

    return (
        <nav className="pb-3 pt-3 bg-accent-light border-b-2 border-accent-light shadow-sm align-center font-[Montserrat]">
            <div className="flex w-full">
                <div className="flex w-12 h-auto ml-15">
                    <Link href="/" className="nav-underline no-anim-link">
                        <img src="icon0.svg"/>
                    </Link>
                </div>
                <div className="flex gap-10 ml-auto justify-end mr-15 items-center">
                    <Link className="nav-bar-text text-2xl text-center text-link leading-none nav-underline no-anim-link" href="/">{t.nav_about}</Link>
                    <Link className="nav-bar-text text-2xl text-center text-link leading-none nav-underline no-anim-link" href="/portfolio">{t.nav_portfolio}</Link>
                    <Link className="nav-bar-text text-2xl text-center text-link leading-none nav-underline no-anim-link" href="/qualifications">{t.nav_qualifications}</Link>
                    <Link className="nav-bar-text text-2xl text-center text-link leading-none nav-underline no-anim-link" href="/service">{t.nav_service}</Link>
                </div>
            </div>
        </nav>
    );
};

export default Nav;