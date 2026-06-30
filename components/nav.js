import Link from "next/link";

const Nav = () => {
    return (
        <nav className="flex gap-10 justify-center">
            <Link className="nav-bar-text text-center text-link" href="/">About</Link>
            <Link className="nav-bar-text text-center text-link" href="/portfolio">Portfolio</Link>
            <Link className="nav-bar-text text-center text-link" href="/qualifications">Qualifications</Link>
            <Link className="nav-bar-text text-center text-link" href="/service">Service</Link>
        </nav>
    );
};

export default Nav;