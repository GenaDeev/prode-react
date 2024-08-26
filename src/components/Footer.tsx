import { Link } from "react-router-dom";

export default function Footer() {

    const currentYear = ():number => {
        const today = new Date();
        return today.getFullYear();
    }

    return (
        <footer className="lg:ml-[256px] gap-4 rounded-t-xl flex items-center justify-center">
            <img width={32} src="/genadev-v-nobg-1.webp" alt="Logo de GenaDeev"/>
            <p>© {currentYear()} Desarrollado por <Link className="hover:text-green-500 transition duration-200" to="https://github.com/GenaDeev">GenaDeev</Link> y mantenido por <Link className="hover:text-green-500 transition duration-200" to="https://comidolar.com.ar">ComiDolar</Link></p>
            <img width={64} src="/comidolar-logo.webp" alt="Logo de ComiDolar"/>
        </footer>
    )
}