import {Injectable} from '@angular/core';
import {catchError, of, retry, Subject, take} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {corsAnywhereUrl} from './wiki.service';
import {WikiResponse} from '../../models/wiki-model';

@Injectable({
    providedIn: 'root'
})
export class WikiImageService {


    image$ = new Subject<string>();

    private demoResponse = {} as WikiResponse


    fetchImage(title: string) {
        this.http.get<WikiResponse>(`${corsAnywhereUrl}https://en.wikipedia.org/w/api.php?action=query&format=json&titles=${title}&prop=pageimages&pithumbsize=100&pilicense=any`)
            .pipe(
                retry(2),
                take(1),
                catchError(err => {
                    return of(this.demoResponse)
                })
            )
            .subscribe(response => {
                for (const key in response.query.pages) {
                    if (response.query.pages.hasOwnProperty(key)) {
                        const imageUrl = response.query.pages[key].thumbnail?.source;
                        if (imageUrl) {
                            this.image$.next(imageUrl);
                        }
                    }
                }
            })
        return this.image$
    }

    constructor(private http: HttpClient) {

    }
}
