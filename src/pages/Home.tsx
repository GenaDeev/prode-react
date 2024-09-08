import { matches } from "@/data/matches"
import MatchCard from "@/components/MatchCard"
import type { Match, ContextProps } from "@/types";
import { Link, useLocation, useParams } from "react-router-dom";

export default function Home({ context }: ContextProps) {
    const { pathname } = useLocation();
    const isHomePage = pathname === "/";
    const onGoalChange = () => {
        return
    }
    let { fecha }: { fecha?: number } = useParams();
    return (
        <div className="flex flex-col items-start gap-4">
            <h1 className="text-2xl font-bold mb-3">Fecha {fecha ? fecha : context.matchday.current} - Liga Profesional 2024</h1>
            <Link

                className={`p-4 rounded-xl ${isHomePage
                    ? "bg-green-500 border-green-300 hover:bg-green-400 active:border-2"
                    : "bg-red-500 border-red-300 hover:bg-red-400 active:border-2"
                    }`}
                to={isHomePage ? `/participar/fecha/${context.matchday.current}` : ""}
            >
                {isHomePage ? "Participar de la fecha" : "La fecha terminó o no comenzó aún"}
            </Link>
            <section className="flex items-center justify-center lg:justify-normal gap-4 flex-wrap">
                {matches[
                    fecha !== undefined
                        ? fecha
                        : context.matchday?.current
                ]?.map((match: Match) => (
                    <MatchCard onGoalsChange={onGoalChange} isEditable={false} key={match.id} match={match} />
                )
                )}
            </section>
        </div>
    )
}