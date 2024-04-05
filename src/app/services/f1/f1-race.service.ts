import {Injectable} from '@angular/core';
import {apiResponse, Race} from '../../models/f1-model';
import {catchError, map, of, retry, timeout} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {timeoutDelay} from './f1.service';

@Injectable({
    providedIn: 'root'
})
export class F1RaceService {

    fetchRaces(season: string) {
        return this.http.get<apiResponse>(`https://ergast.com/api/f1/${season}.json`)
            .pipe(
                retry(2),
                timeout(timeoutDelay),
                catchError(err => {
                    console.error(err);
                    return of(this.demoResponse);
                }),
                map(response => {
                    if (response.MRData.RaceTable) {
                        return response.MRData.RaceTable.Races;
                    }
                    return [] as Race[];
                })
            )
    }


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

    constructor(private http: HttpClient) {
    }
}
