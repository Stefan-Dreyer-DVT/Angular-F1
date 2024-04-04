import {Injectable} from '@angular/core';
import {F1SeasonService} from './f1-season.service';
import {F1RaceService} from './f1-race.service';
import {F1ResultService} from './f1-result.service';


@Injectable({
    providedIn: 'root'
})
export class F1Service {

    seasons$ = this.f1Season.seasons$;

    selectSeason(season: string) {
        this.f1Race.fetchRaces(season);
    }

    races$ = this.f1Race.races$;
    raceSelectedIndex: number = -1;

    selectRace(season: string, race: number) {
        this.raceSelectedIndex = race;
        this.f1Result.fetchResults(season, race)
    }

    results$ = this.f1Result.results$;

    constructor(private f1Season: F1SeasonService,
                private f1Race: F1RaceService,
                private f1Result: F1ResultService) {
        f1Season.fetchSeasons();
    }


}
