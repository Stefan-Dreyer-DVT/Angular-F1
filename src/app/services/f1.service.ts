import {Injectable} from '@angular/core';
import {BehaviorSubject, retry, take} from 'rxjs';
import {HttpClient} from '@angular/common/http';

export interface apiResponse {
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


export interface RaceDTO {

}




@Injectable({
    providedIn: 'root'
})
export class F1Service {


    season: string = '';
    seasons$ = new BehaviorSubject<Season[]>([]);

    race: string = '';
    races$ = new BehaviorSubject<Race[]>([]);

    topResult: Driver | undefined;
    results$ = new BehaviorSubject<Result[]>([]);
    resultSub = this.results$.subscribe((results) => {
        if(results.length > 0){
            this.topResult = results[0].Driver;
        }
    })

    selectSeason(season: string) {
        this.updateRaces(season);
        this.season = season;

        this.results$.next([]);
        this.race = '';
    }

    selectRace(season: string, race: number) {
        if (this.races$.getValue().length > 0) {
            this.updateResults(season, race);
            this.race = this.races$.getValue()[race - 1].raceName;
        }
    }


    private updateSeasons() {
        this.http.get<apiResponse>('https://ergast.com/api/f1/seasons.json?limit=100')
            .pipe(
                retry(2),
                take(1)
            )
            .subscribe(response => {
                const seasons = response.MRData.SeasonTable?.Seasons;
                if(seasons){
                    this.seasons$.next(seasons);
                }
                else{
                    console.error('UpdateSeasons DID NOT HAVE SeasonTable...')
                }
            })
    }

    private updateRaces(season: string) {
        this.http.get<apiResponse>(`https://ergast.com/api/f1/${season}.json`)
            .pipe(
                retry(2),
                take(1)
            )
            .subscribe(response =>{
                const raceDetails = response.MRData.RaceTable?.Races
                if(raceDetails){
                    this.races$.next(raceDetails);

                } else {
                    console.error('Response did not have a RaceTable')
                }
            })
    }

    private updateResults(season: string, round: number) {
        this.http.get<apiResponse>(`https://ergast.com/api/f1/${season}/${round}/results.json`)
            .pipe(
                retry(2),
                take(1)
            )
            .subscribe(response =>{
                if (response.MRData.RaceTable) {
                    const raceResult = response.MRData.RaceTable.Races[0]?.Results;
                    if (raceResult) {
                        this.results$.next(raceResult);
                    } else {
                        console.error('Specific Race index did not exist');
                    }
                } else {
                    console.error('Response did not have a RaceTable');
                }
            })
    }

    constructor(private http: HttpClient) {
        this.updateSeasons();


        // this.selectSeason('2022');
        // this.races$.subscribe((value) => {
        //     console.log('This sub ran')
        //     this.selectRace('2022', 1);
        // })
    }


}
