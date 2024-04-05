import {Injectable} from '@angular/core';
import {F1SeasonService} from './f1-season.service';
import {F1RaceService} from './f1-race.service';
import {F1ResultService} from './f1-result.service';
import {BehaviorSubject, combineLatestWith, filter, switchMap} from 'rxjs';


export const timeoutDelay = 20000;

@Injectable({
    providedIn: 'root'
})
export class F1Service {

    private selectedSeason$ = new BehaviorSubject<string>('');
    selectedRace$ = new BehaviorSubject<number>(0)

    selectSeason(season: string) {
        this.selectedSeason$.next(season);
    }

    selectRace(race: number) {
        this.selectedRace$.next(race);
    }

    seasons$ = this.f1Season.fetchSeasons();  //just executes on startup

    races$ = this.selectedSeason$.pipe(
        filter(season => season.length > 0),
        switchMap(season => this.f1Race.fetchRaces(season))
    )

    results$ = this.selectedRace$.pipe(
        combineLatestWith(this.selectedSeason$),
        filter(raceSeason => raceSeason[0] > 0 && raceSeason[1].length > 0),
        switchMap(race => this.f1Result.fetchResults(race[1], race[0]))
    )

    constructor(private f1Season: F1SeasonService,
                private f1Race: F1RaceService,
                private f1Result: F1ResultService) {
    }
}
