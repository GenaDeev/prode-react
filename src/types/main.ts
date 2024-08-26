export type Context = {
    matchday: {
        current: number;
        max: number;
    };
};

export type Team = {
    id: number;
    shortName: string;
    fullName: string;
};

export type Match = {
    id: number;
    home: Team;
    away: Team;
    goals: {
        home: number | undefined;
        away: number | undefined;
    };
    time: {
        dateTime: string;
        time: string;
        date: string;
    }
}

export type Table = {
    id: number;
    name: string;
    points: number;
    partial: number;
    total: number;
    fail: number;
    played: number;
}