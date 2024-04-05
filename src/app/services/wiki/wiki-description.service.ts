import {Injectable} from '@angular/core';
import {catchError, map, of, retry, switchMap, take} from 'rxjs';
import {WikiResponse} from '../../models/wiki-model';
import {corsAnywhereUrl} from './wiki.service';
import {HttpClient} from '@angular/common/http';
import {F1Service} from '../f1/f1.service';

@Injectable({
    providedIn: 'root'
})
export class WikiDescriptionService {

    fetchDescription(title: string) {
        return this.http.get<WikiResponse>(`${corsAnywhereUrl}https://en.wikipedia.org/w/api.php?action=query&titles=${title}&prop=extracts&exintro&explaintext&format=json`)
            .pipe(
                retry(2),
                catchError(err => {
                    return of(this.demoResponse)
                }),
                map(response => {
                    for (const key in response.query.pages) {
                        if (response.query.pages.hasOwnProperty(key)) {
                            const extract = response.query.pages[key].extract;
                            if (extract) {
                                return extract;
                            }
                        }
                    }
                    return '';
                })
            )
    }

    private demoResponse ={} as WikiResponse

    constructor(private http: HttpClient, private f1Service: F1Service) {
    }
}
