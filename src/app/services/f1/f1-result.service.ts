import {Injectable} from '@angular/core';
import {apiResponse, Result} from '../../models/f1-model';
import {catchError, map, of, retry, Subject, switchMap, timeout} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {timeoutDelay} from './f1.service';

@Injectable({
    providedIn: 'root'
})
export class F1ResultService {

    fetchResults(season: string, round: number) {
        return this.http.get<apiResponse>(`https://ergast.com/api/f1/${season}/${round}/results.json`)
            .pipe(
                retry(2),
                timeout(timeoutDelay),
                catchError(err => {
                    console.error(err)

                    return of(this.demoResponse)
                }),
                map(response => {
                    if (response.MRData?.RaceTable?.Races[0].Results) {
                        return response.MRData.RaceTable.Races[0].Results
                    }
                    return [] as Result[]
                })
            )
    }

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

    constructor(private http: HttpClient) {
    }
}
