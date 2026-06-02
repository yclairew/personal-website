import Link from "next/link";

const Footer = () => {
    return (
        <footer id="footer" className="flex gap-160 justify-center font-[Montserrat] bg-[#e9d1d9] mt-30 p-14">
            <div className="space-y-2">
                <h3 className="text-lg font-semibold">Claire Wu</h3>
                <h3 className="text-sm">Full Stack Developer</h3>
                <p className="text-sm">© {new Date().getFullYear()} Claire Wu</p>
            </div>

            <div className="space-y-2">
                <a className="block text-sm underline decoration-1 underline-offset-4" href="http://www.linkedin.com/in/y-clairewu/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a className="block text-sm underline decoration-1 underline-offset-4" href="https://github.com/yclairew" target="_blank" rel="noopener noreferrer">GitHub</a>
                <a className="block text-sm underline decoration-1 underline-offset-4" href="mailto:y.clairewu@tamu.edu">Email</a>
                {/* TODO: fix animation underline length */}
            </div>
        </footer>
    );
};

export default Footer;