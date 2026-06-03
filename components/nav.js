import Link from "next/link";

const Nav = () => {
    return (
        <nav className="flex gap-10 justify-center">
            <Link className="nav-bar-text text-center " href="/">About</Link>
            <Link className="nav-bar-text text-center " href="/portfolio">Portfolio</Link>
            <Link className="nav-bar-text text-center " href="/qualifications">Qualifications</Link>
            <Link className="nav-bar-text text-center " href="/service">Service</Link>
            {/* TODO: maybe even contact to link to footer */}
        </nav>
    );
};

export default Nav;