import {Injectable} from '@angular/core';
import {BehaviorSubject, retry, Subject, take} from 'rxjs';
import {WikiResponse} from '../../models/wiki-model';
import {corsAnywhereUrl} from './wiki.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class WikiDescriptionService {


    description$ = new Subject<string>();

    fetchDescription(title: string) {
        this.http.get<WikiResponse>(`${corsAnywhereUrl}https://en.wikipedia.org/w/api.php?action=query&titles=${title}&prop=extracts&exintro&explaintext&format=json`)
            .pipe(
                retry(2),
                take(1)
            )
            .subscribe(response => {
                for (const key in response.query.pages) {
                    if (response.query.pages.hasOwnProperty(key)) {
                        const extract = response.query.pages[key].extract;
                        if (extract) {
                            this.description$.next(extract);
                        }
                    }
                }
            })
        return this.description$
    }

    constructor(private http: HttpClient) {
    }
}
