import { Link, NavLink } from "react-router-dom"
import type { ContextProps } from "@/types"
import { useState } from "react";

export default function Header({ context, toggleAside }: { context: ContextProps, toggleAside: () => null }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen);
        toggleAside();
    }

    return (
        <header className="z-50 fixed w-full">
            <nav className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <Link className="flex flex-wrap items-center bg-neutral-800 font-bold p-1 rounded-md gap-3 hover:scale-105 hover:bg-neutral-700 active:scale-95 active:bg-neutral-600 transition duration-200" to="/">
                        <img src="/prode-logo.webp" width={32} height={32} />
                        <img src="/comidolar-logo.webp" width={32} height={32} />
                        <span className="hidden sm:inline">Prode CNBA</span>
                    </Link>
                    <button
                        className="lg:hidden px-3 py-3 bg-neutral-800 font-bold p-1 rounded-md gap-3 hover:scale-105 hover:bg-neutral-700 active:scale-95 active:bg-neutral-600 transition duration-200"
                        onClick={handleClick}
                    >
                        {isOpen ?
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width={16} height={16}>
                                <path fillRule="evenodd" d="M10.72 11.47a.75.75 0 0 0 0 1.06l7.5 7.5a.75.75 0 1 0 1.06-1.06L12.31 12l6.97-6.97a.75.75 0 0 0-1.06-1.06l-7.5 7.5Z" clipRule="evenodd" />
                                <path fillRule="evenodd" d="M4.72 11.47a.75.75 0 0 0 0 1.06l7.5 7.5a.75.75 0 1 0 1.06-1.06L6.31 12l6.97-6.97a.75.75 0 0 0-1.06-1.06l-7.5 7.5Z" clipRule="evenodd" />
                            </svg>
                            :
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width={16} height={16}>
                                <path fillRule="evenodd" d="M3 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 5.25Zm0 4.5A.75.75 0 0 1 3.75 9h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 9.75Zm0 4.5a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Zm0 4.5a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                            </svg>

                        }
                    </button>
                </div>
                <ul className="flex items-center gap-4">
                    <li className="hover:text-green-500 transition duration-200">
                        <NavLink to={"/participar/fecha/" + context.context.matchday.current}>Participar</NavLink>
                    </li>
                    <li className="hover:text-green-500 transition duration-200">
                        <NavLink to="/tabla">Tabla</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}