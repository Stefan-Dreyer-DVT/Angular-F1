import {Injectable} from '@angular/core';
import {apiResponse, Season} from '../../models/f1-model';
import {catchError, of, retry, Subject, take, timeout} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {timeoutDelay} from './f1.service';

@Injectable({
    providedIn: 'root'
})
export class F1SeasonService {


    seasons$ = new Subject<Season[]>();

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

    fetchSeasons() {
        this.http.get<apiResponse>('https://ergast.com/api/f1/seasons.json?limit=100')
            .pipe(
                retry(2),
                timeout(timeoutDelay),
                take(1),
                catchError(err => {
                    console.error(err);

                    return of(this.demoResponse);

                })
            )
            .subscribe(response => {
                const seasons = response.MRData.SeasonTable?.Seasons;
                if (seasons) {
                    this.seasons$.next(seasons);
                } else {
                    console.error('UpdateSeasons DID NOT HAVE SeasonTable...')
                }
            })

        return this.seasons$;
    }

    constructor(private http: HttpClient) {
    }
}
