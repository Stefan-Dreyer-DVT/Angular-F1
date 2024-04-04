import {Injectable} from '@angular/core';
import {apiResponse, Result} from '../../models/f1-model';
import {retry, Subject, take} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class F1ResultService {

    results$ = new Subject<Result[]>();
    // results: Result[] = [];

    fetchResults(season: string, round: number) {
        this.http.get<apiResponse>(`https://ergast.com/api/f1/${season}/${round}/results.json`)
            .pipe(
                retry(2),
                take(1)
            )
            .subscribe(response => {
                if (response.MRData.RaceTable) {
                    const raceResult = response.MRData.RaceTable.Races[0]?.Results;
                    if (raceResult) {
                        this.results$.next(raceResult);
                        // this.results = raceResult;
                    } else {
                        console.error('Specific Race index did not exist');
                    }
                } else {
                    console.error('Response did not have a RaceTable');
                }
            })
        return this.results$;
    }

    constructor(private http: HttpClient) {
    }
}
