// components/MatchCard.tsx
import TeamComponent from "./TeamComponent";
import type { Match } from "@/types/main";

interface Props {
    match: Match;
    isEditable: boolean;
    onGoalsChange: (homeGoals: number | undefined, awayGoals: number | undefined) => void;
    homeGoals?: number;
    awayGoals?: number;
}

export default function MatchCard(props: Props) {
    const { match, isEditable, onGoalsChange, homeGoals, awayGoals } = props;

    const handleHomeGoalChange = (goals: number | undefined) => {
        onGoalsChange(goals, awayGoals);
    };

    const handleAwayGoalChange = (goals: number | undefined) => {
        onGoalsChange(homeGoals, goals);
    };

    return (
        <div className="flex flex-col w-72 p-4 border rounded-lg shadow-lg space-y-2">
            <div className="text-center">
                <time dateTime={match.time.dateTime} className="text-sm text-gray-500">
                    {match.time.date} - {match.time.time}
                </time>
            </div>

            <div className="flex items-center justify-between">
                <TeamComponent
                    shortName={match.home.shortName}
                    fullName={match.home.fullName}
                    id={match.home.id}
                    goals={homeGoals}
                    isEditable={isEditable}
                    onGoalChange={handleHomeGoalChange}
                />
                <div className="mx-4 text-gray-500">vs</div>
                <TeamComponent
                    shortName={match.away.shortName}
                    fullName={match.away.fullName}
                    id={match.away.id}
                    goals={awayGoals}
                    isEditable={isEditable}
                    onGoalChange={handleAwayGoalChange}
                />
            </div>
        </div>
    );
}
