import {Injectable} from '@angular/core';
import {apiResponse, Race} from '../../models/f1-model';
import {catchError, of, retry, Subject, take, timeout} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {timeoutDelay} from './f1.service';

@Injectable({
    providedIn: 'root'
})
export class F1RaceService {


    races$ = new Subject<Race[]>();
    // races: Race[] = [];

    private demoResponse = {
        MRData: {
            RaceTable: {
                season: '2051',
                Races: [
                    {
                        season: '2051',
                        round: '1',
                        raceName: 'My Race',
                    },
                    {
                        season: '2051',
                        round: '2',
                        raceName: 'Backup Race'
                    }
                ]
            }
        }
    } as apiResponse;


    fetchRaces(season: string) {
        this.http.get<apiResponse>(`https://ergast.com/api/f1/${season}.json`)
            .pipe(
                retry(2),
                timeout(timeoutDelay),
                take(1),
                catchError(err => {
                    console.log(err);
                    return of(this.demoResponse);
                })
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
