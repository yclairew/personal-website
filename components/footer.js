"use client";
import Link from "next/link";
import { useLocale } from "@/lib/i18n/Locale_context";

const Footer = () => {
    const { t } = useLocale();
    return (
        <footer id="footer" className="bg-accent-light border-t-2 border-accent-light shadow-sm font-[Montserrat]">
            <div className="mx-auto flex max-w-240 justify-between items-center p-10 lg:px-14 lg:py-14">
                <div className="space-y-2">
                    <h3 className="text-base lg:text-lg font-semibold text-text">{t.footer_heading}</h3>
                    <h3 className="text-xs lg:text-sm text-text">{t.footer_role}</h3>
                    <p className="text-xs lg:text-sm text-text">© {new Date().getFullYear()}{" "}{t.footer_heading}</p>
                </div>

                <div className="space-y-2">
                    <Link className="table text-xs lg:text-sm text-link" href="http://www.linkedin.com/in/y-clairewu/" target="_blank" rel="noopener noreferrer">{t.footer_linkedin}</Link>
                    <Link className="table text-xs lg:text-sm text-link" href="https://github.com/yclairew" target="_blank" rel="noopener noreferrer">{t.footer_github}</Link>
                    <Link className="table text-xs lg:text-sm text-link" href="mailto:y.clairewu@gmail.com">{t.footer_email}</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;