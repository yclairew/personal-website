import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-accent-light border-t-2 border-accent-light shadow-lg font-[Montserrat]">
            <div className="mx-auto flex max-w-240 justify-between items-center px-14 py-14">
                <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-text">Claire Wu</h3>
                    <h3 className="text-sm text-text">Full Stack Developer</h3>
                    <p className="text-sm text-text">© {new Date().getFullYear()} Claire Wu</p>
                </div>

                <div className="space-y-2">
                    <a className="table text-sm text-link" href="http://www.linkedin.com/in/y-clairewu/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    <a className="table text-sm text-link" href="https://github.com/yclairew" target="_blank" rel="noopener noreferrer">GitHub</a>
                    <a className="table text-sm text-link" href="mailto:y.clairewu@gmail.com">Email</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;