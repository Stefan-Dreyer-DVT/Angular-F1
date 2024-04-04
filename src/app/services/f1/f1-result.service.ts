import {Injectable} from '@angular/core';
import {apiResponse, Result} from '../../models/f1-model';
import {catchError, of, retry, Subject, take, timeout} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {timeoutDelay} from './f1.service';

@Injectable({
    providedIn: 'root'
})
export class F1ResultService {

    results$ = new Subject<Result[]>();
    // results: Result[] = [];

    private demoResponse = {
        MRData: {
            RaceTable: {
                season: '2051',
                round: '1',
                Races: [{
                    season: '2051',
                    round: '1',
                    raceName: 'This is a fixed name',
                    Results: [
                        {
                            position: '1',
                            points: '25',
                            Driver: {
                                familyName: 'Person',
                                givenName: 'Bob',
                                url: '/Lewis_Hamilton',
                                nationality: 'British'
                            }
                        },
                        {
                            position: '2',
                            points: '15',
                            Driver: {
                                familyName: 'People',
                                givenName: 'Bob',
                                url: '/Lewis_Hamilton',
                                nationality: 'British'
                            }
                        },
                        {
                            position: '3',
                            points: '5',
                            Driver: {
                                familyName: 'Killer',
                                givenName: 'Bob',
                                url: '/Lewis_Hamilton',
                                nationality: 'British'
                            }
                        }
                    ]
                }]
            }
        }
    } as apiResponse

    fetchResults(season: string, round: number) {
        this.http.get<apiResponse>(`https://ergast.com/api/f1/${season}/${round}/results.json`)
            .pipe(
                retry(2),
                timeout(timeoutDelay),
                take(1),
                catchError(err => {
                    console.error(err)

                    return of(this.demoResponse)
                })
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
