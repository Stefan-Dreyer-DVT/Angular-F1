import {Injectable} from '@angular/core';
import {catchError, map, of, retry, switchMap, take} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {corsAnywhereUrl} from './wiki.service';
import {WikiResponse} from '../../models/wiki-model';
import {F1Service} from '../f1/f1.service';

@Injectable({
    providedIn: 'root'
})
export class WikiImageService {

    fetchImage(title: string) {
        return this.http.get<WikiResponse>(`${corsAnywhereUrl}https://en.wikipedia.org/w/api.php?action=query&format=json&titles=${title}&prop=pageimages&pithumbsize=100&pilicense=any`)
            .pipe(
                retry(2),
                catchError(err => {
                    return of(this.demoResponse)
                }),
                map(response => {
                    for (const key in response.query.pages) {
                        if (response.query.pages.hasOwnProperty(key)) {
                            const imageUrl = response.query.pages[key].thumbnail?.source;
                            if (imageUrl) {
                                return imageUrl
                            }
                        }
                    }
                    return '' as string;
                })
            )
    }

    private demoResponse = {} as WikiResponse

    constructor(private http: HttpClient,
                private f1Service: F1Service) {

    }
}
