import {Injectable} from '@angular/core';
import {retry, Subject, take} from 'rxjs';
import {HttpClient} from '@angular/common/http';

export interface SeasonResponse {
    MRData: Mrdata
}

export interface Mrdata {
    xmlns: string
    series: string
    url: string
    limit: string
    offset: string
    total: string
    SeasonTable?: SeasonTable
    RaceTable?: RaceTable
}

export interface SeasonTable {
    Seasons: Season[]
}

export interface Season {
    season: string
    url: string
}


export interface RaceTable {
    season: string
    round?: string
    Races: Race[]
}

export interface Race {
    season: string
    round: string
    url: string
    raceName: string
    Circuit: Circuit
    date: string
    time: string
    Results?: Result[]
}

export interface Circuit {
    circuitId: string
    url: string
    circuitName: string
    Location: Location
}

export interface Location {
    lat: string
    long: string
    locality: string
    country: string
}

export interface Result {
    number: string
    position: string
    positionText: string
    points: string
    Driver: Driver
    Constructor: Constructor
    grid: string
    laps: string
    status: string
    Time?: Time
    FastestLap?: FastestLap
}

export interface Driver {
    driverId: string
    permanentNumber?: string
    code: string
    url: string
    givenName: string
    familyName: string
    dateOfBirth: string
    nationality: string
}

export interface Constructor {
    constructorId: string
    url: string
    name: string
    nationality: string
}

export interface Time {
    millis: string
    time: string
}

export interface FastestLap {
    rank: string
    lap: string
    Time: Time2
    AverageSpeed: AverageSpeed
}

export interface Time2 {
    time: string
}

export interface AverageSpeed {
    units: string
    speed: string
}

@Injectable({
    providedIn: 'root'
})
export class F1Service {

    seasons$ = new Subject<string[]>();
    seasons : Season[] = [];

    updateSeasons() {
        this.http.get<SeasonResponse>('https://ergast.com/api/f1/seasons.json')
            .pipe(
                retry(2),
                take(1)
            )
            .subscribe(response => {
                const seasons = response.MRData.SeasonTable?.Seasons.map(season => season.season)
                if(seasons){
                    this.seasons$.next(seasons);
                }
                else{
                    console.error("UpdateSeasons DID NIT HAVE SeasonTable...")
                }
            })
    }

    races$ = new Subject<Race[]>();

    updateRaces(season: string) {
        this.http.get<SeasonResponse>(`https://ergast.com/api/f1/${season}.json`)
            .pipe(
                retry(2),
                take(1)
            )
            .subscribe(response =>{
                const raceDetails = response.MRData.RaceTable?.Races
                if(raceDetails){
                    this.races$.next(raceDetails);
                }
            })
    }

    results$ =new Subject<Result[]>();

    updateResults(season: string, round:string){
        this.http.get<SeasonResponse>(`https://ergast.com/api/f1/${season}/${round}/results.json`)
            .pipe(
                retry(2),
                take(1)
            )
            .subscribe(response =>{
                const raceResult = response.MRData.RaceTable?.Races[0]?.Results;
                if(raceResult){
                    this.results$.next(raceResult);
                }
            })
    }

    constructor(private http: HttpClient) {

    }
}
