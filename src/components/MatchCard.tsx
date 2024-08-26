import TeamComponent from "./TeamComponent"
import type { Match } from "@/types/main"

interface Props {
    match: Match
}

export default function MatchCard(props: Props) {
    const { match } = props;
    return (
        <div className="flex flex-col w-72 p-4 border rounded-lg shadow-lg space-y-2">
            <div className="text-center">
                <time dateTime={match.time.dateTime} className="text-sm text-gray-500">
                    {match.time.date} - {match.time.time}
                </time>
            </div>

            <div className="flex items-center justify-between">
                <TeamComponent key={match.home.id} shortName={match.home.shortName} fullName={match.home.fullName} id={match.home.id} goals={match.goals.home} />
                <div className="mx-4 text-gray-500">vs</div>
                <TeamComponent key={match.away.id} shortName={match.away.shortName} fullName={match.away.fullName} id={match.away.id} goals={match.goals.away} />
            </div>
        </div>
    )
}
