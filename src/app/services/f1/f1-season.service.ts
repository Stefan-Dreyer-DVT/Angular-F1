import {Injectable} from '@angular/core';
import {apiResponse} from '../../models/f1-model';
import {catchError, map, of, retry, timeout} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {timeoutDelay} from './f1.service';

@Injectable({
    providedIn: 'root'
})
export class F1SeasonService {

    fetchSeasons() {
        return this.http.get<apiResponse>('https://ergast.com/api/f1/seasons.json?limit=100')
            .pipe(
                retry(2),
                timeout(timeoutDelay),
                catchError(err => {
                    console.error(err);

                    return of(this.demoResponse);

                }),
                map(response => {
                    if (response.MRData.SeasonTable) {
                        return response.MRData.SeasonTable.Seasons
                    }
                    return [];
                })
            );

    }

    private demoResponse = {
        MRData: {
            SeasonTable: {
                Seasons: [
                    {
                        season: '2050',
                        url: ''
                    },
                    {
                        season: '2051',
                        url: ''
                    }
                ]
            }
        }
    } as apiResponse;

    constructor(private http: HttpClient) {
    }
}
