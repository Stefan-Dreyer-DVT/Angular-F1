import {Injectable} from '@angular/core';
import {apiResponse, Race} from '../../models/f1-model';
import {retry, Subject, take} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class F1RaceService {


    races$ = new Subject<Race[]>();
    // races: Race[] = [];

    fetchRaces(season: string) {
        this.http.get<apiResponse>(`https://ergast.com/api/f1/${season}.json`)
            .pipe(
                retry(2),
                take(1)
            )
            .subscribe(response => {
                const raceDetails = response.MRData.RaceTable?.Races
                if (raceDetails) {
                    this.races$.next(raceDetails);
                    // this.races = raceDetails;
                } else {
                    console.error('Response did not have a RaceTable')
                }
            })

        return this.races$
    }

    constructor(private http: HttpClient) {
    }
}
