import { useState } from "react";
import { matches } from "@/data/matches";
import { tokens } from "@/data/tokens";
import MatchCard from "@/components/MatchCard";
import type { Match, ContextProps } from "@/types";
import { useParams, Link } from "react-router-dom";

export default function NewPrediction({ context }: ContextProps) {
    const { fecha } = useParams();
    const index = fecha !== undefined && !isNaN(parseInt(fecha, 10))
        ? parseInt(fecha, 10)
        : context.matchday?.current;

    const isValidIndex = typeof index === 'number' && matches[index] !== undefined;
    const isActualMatchday = index === context.matchday.current;
    const [hasPermission, setHasPermission] = useState<boolean>(false);
    const [formCompleted, setFormCompleted] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>('');
    const [tokenError, setTokenError] = useState<string | null>(null);
    const [userName, setUserName] = useState<string | null>(null);
    const [matchResults, setMatchResults] = useState<Record<number, { homeGoals: number | undefined, awayGoals: number | undefined }>>({});
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleTokenSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const tokenData = tokens.find(token => token.t === inputValue);
        if (tokenData) {
            setHasPermission(true);
            setFormCompleted(true);
            setTokenError(null);
            setUserName(tokenData.name);
        } else {
            setTokenError('Token incorrecto');
            setHasPermission(false);
            setUserName(null);
        }
    };

    const handleMatchResultsChange = (matchId: number, homeGoals: number | undefined, awayGoals: number | undefined) => {
        setMatchResults(prevResults => ({
            ...prevResults,
            [matchId]: { homeGoals, awayGoals }
        }));
    };

    const handleSubmitResults = () => {
        const allMatchesCompleted = matches[index]?.every(match => {
            const { homeGoals, awayGoals } = matchResults[match.id] || {};
            return homeGoals !== undefined && awayGoals !== undefined;
        });

        if (allMatchesCompleted) {
            setErrorMessage(null);
            setSuccessMessage("¡Predicciones enviadas con éxito!");
            console.log("Resultados a enviar:", matchResults);
            // Aquí puedes enviar los datos a la API
            // fetch('tu-api-url', { method: 'POST', body: JSON.stringify(matchResults) });
        } else {
            setErrorMessage("Por favor, completa los goles para todos los partidos antes de enviar.");
            setSuccessMessage(null);
        }
    };

    const handleRandomizeResults = () => {
        const randomResults = matches[index]?.reduce((acc, match) => {
            acc[match.id] = {
                homeGoals: Math.floor(Math.random() * 6), // Goles entre 0 y 5
                awayGoals: Math.floor(Math.random() * 6) // Goles entre 0 y 5
            };
            return acc;
        }, {} as Record<number, { homeGoals: number | undefined, awayGoals: number | undefined }>);

        setMatchResults(randomResults || {});
    };

    return (
        <div>
            {successMessage ? (
                <div className="flex flex-col items-center justify-center h-screen">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="128"
                        height="128"
                        fill="none"
                        stroke="currentColor"
                        className="text-green-500"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                    >
                        <path stroke="none" d="M0 0h24v24H0z"></path>
                        <path d="M3 7h3M3 11h2M9.02 8.801l-.6 6A2 2 0 0010.41 17h7.98a2 2 0 001.99-1.801l.6-6A2 2 0 0018.99 7h-7.98a2 2 0 00-1.99 1.801z"></path>
                        <path d="M9.8 7.5l2.982 3.28a3 3 0 004.238.202L20.3 8"></path>
                    </svg>
                    <p>Fecha {index}</p>
                    <h1 className="text-2xl font-bold text-green-500 mb-4">{successMessage}</h1>
                    <Link
                        to="/"
                        className="px-4 py-2 bg-green-500 border-green-300 hover:bg-green-400 active:border-2 text-white rounded-xl"
                    >
                        Volver a la Página Principal
                    </Link>
                </div>
            ) : (
                <>
                    {!isActualMatchday ? (
                        <h1 className="text-2xl font-bold mb-3 text-red-500">Fecha finalizada o aún no comenzada</h1>
                    ) : (
                        <div className="flex flex-col">
                            {!formCompleted ? (
                                <section>
                                    <h1 className="text-2xl font-bold mb-3">Ingresa tu TOKEN de la FECHA {index} para participar</h1>
                                    <p>Aún no tienes tu TOKEN? Paga el importe de esta fecha por <a target="_blank" referrerPolicy="no-referrer" className="text-green-500" href={`https://wa.me/5491127556546?text=Quiero+mi+TOKEN+de+la+fecha+${index}+de+la+Liga+Profesional+para+el+PRODE+CNBA.`}>WhatsApp</a> y habilítate para votar</p>
                                    <form onSubmit={handleTokenSubmit} className="flex flex-col items-start">
                                        <input
                                            value={inputValue}
                                            onChange={(e) => setInputValue(e.target.value)}
                                            maxLength={6}
                                            minLength={6}
                                            type="text"
                                            required
                                            className={`border p-2 ${tokenError ? 'border-red-500' : 'border-gray-300'} rounded text-2xl`}
                                        />
                                        {tokenError && <p className="text-red-500 mt-2">{tokenError}</p>}
                                        <button type="submit" className="mt-2 px-4 py-2 bg-green-500 border-green-300 hover:bg-green-400 active:border-2 text-white rounded-xl">Verificar</button>
                                    </form>
                                </section>
                            ) : (
                                <>
                                    {isValidIndex ? (
                                        <>
                                            <button
                                                onClick={handleRandomizeResults}
                                                className="mb-4 px-4 py-2 flex items-center justify-start w-64 gap-4 bg-blue-500 border-blue-300 hover:bg-blue-400 active:border-2 text-white rounded-xl"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                    <path d="M4.05 11a8 8 0 1 1 .5 4m-.5 5v-5h5" />
                                                </svg>
                                                Randomizar Resultados
                                            </button>
                                            <h1 className="text-2xl font-bold mb-3">Fecha {index} - Liga Profesional 2024</h1>
                                            {hasPermission && (
                                                <>
                                                    <h3 className="text-xl mb-3">Predicciones del usuario: <span className="text-green-500 font-bold">{userName}</span></h3>
                                                    <section className="flex items-center justify-center lg:justify-normal gap-4 flex-wrap">
                                                        {matches[index]?.map((match: Match) => (
                                                            <MatchCard
                                                                key={match.id}
                                                                match={match}
                                                                isEditable={true}
                                                                onGoalsChange={(homeGoals, awayGoals) => handleMatchResultsChange(match.id, homeGoals, awayGoals)}
                                                                homeGoals={matchResults[match.id]?.homeGoals}
                                                                awayGoals={matchResults[match.id]?.awayGoals}
                                                            />
                                                        ))}
                                                    </section>
                                                    {errorMessage && <p className="text-red-500 text-center mt-4">{errorMessage}</p>}
                                                    <button
                                                        onClick={handleSubmitResults}
                                                        className="mt-4 px-4 py-2 flex items-center justify-start w-64 gap-4 text-white bg-green-500 border-green-300 hover:bg-green-400 active:border-2 rounded-xl"
                                                    >
                                                        Enviar Predicciones
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="24"
                                                            height="24"
                                                            fill="none"
                                                            stroke="#fff"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="1.5"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path stroke="none" d="M0 0h24v24H0z"></path>
                                                            <path d="M4.698 4.034L21 12 4.698 19.966a.503.503 0 01-.546-.124.555.555 0 01-.12-.568L6.5 12 4.032 4.726a.555.555 0 01.12-.568.503.503 0 01.546-.124zM6.5 12H21"></path>
                                                        </svg>
                                                    </button>
                                                </>
                                            )}
                                        </>
                                    ) : (
                                        <h1>Esta fecha no ha comenzado o ya terminó</h1>
                                    )}
                                </>
                            )}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
