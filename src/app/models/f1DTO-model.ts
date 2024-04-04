

export interface SeasonDTO{
    season : string,
    races : RaceDTO[]
}

export interface RaceDTO{
    round: string,
    raceName: string,
    Results: ResultDTO[]
}

export interface ResultDTO{
    position: string,
    points: string,
    Time? : string,
    driver : Driver
}

export interface Driver{
    url: string,
    name: string,
    surname: string,
    nationality: string,
}