import {Injectable} from '@angular/core';
import {apiResponse, Season} from '../../models/f1-model';
import {retry, Subject, take} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class F1SeasonService {


    seasons$ = new Subject<Season[]>();


    fetchSeasons() {
        this.http.get<apiResponse>('https://ergast.com/api/f1/seasons.json?limit=100')
            .pipe(
                retry(2),
                take(1)
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
