interface Props {
    shortName: string,
    fullName: string,
    id: number,
    goals: number | undefined
}

export default function TeamComponent(props: Props) {
    const {shortName, fullName, id, goals} = props;
    return (
        <div className="flex flex-col items-center">
            <img loading="lazy" width="64px" height="64px" className="object-contain aspect-square" src={"/escudos/" + id + ".svg"} />
            <span title={fullName} className="font-semibold">{shortName}</span>
            <span className="text-xl font-bold bg-neutral-200 px-3 py-1 mt-2">{goals ?? '-'}</span>
        </div>
    )
}