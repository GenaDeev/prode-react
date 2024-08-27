// components/TeamComponent.tsx
import { ChangeEvent } from 'react';

interface Props {
    shortName: string;
    fullName: string;
    id: number;
    goals: number | undefined;
    isEditable: boolean;
    onGoalChange: (goals: number | undefined) => void;
}

export default function TeamComponent(props: Props) {
    const { shortName, fullName, id, goals, isEditable, onGoalChange } = props;
    
    const handleGoalChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newGoals = Number(event.target.value) || undefined;
        onGoalChange(newGoals);
    };

    return (
        <div className="flex flex-col items-center">
            <img loading="lazy" width="64px" height="64px" className="object-contain aspect-square" src={`/escudos/${id}.svg`} />
            <span title={fullName} className="font-semibold">{shortName}</span>
            {isEditable ? (
                <input
                    type="number"
                    value={goals ?? ''}
                    onChange={handleGoalChange}
                    className="max-w-12 text-center flex items-center justify-center p-1 border rounded mt-2 text-xl"
                    min="0"
                />
            ) : (
                <span className="text-xl font-bold bg-neutral-200 px-3 py-1 mt-2">{goals ?? '-'}</span>
            )}
        </div>
    );
}
