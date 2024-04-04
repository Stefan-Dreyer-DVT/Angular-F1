import {Injectable} from '@angular/core';
import {BehaviorSubject, retry, Subject, take} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {F1ResultService} from '../f1/f1-result.service';
import {corsAnywhereUrl} from './wiki.service';
import {WikiResponse} from '../../models/wiki-model';

@Injectable({
    providedIn: 'root'
})
export class WikiImageService {


    image$ = new Subject<string>();

    fetchImage(title: string) {
        this.http.get<WikiResponse>(`${corsAnywhereUrl}https://en.wikipedia.org/w/api.php?action=query&format=json&titles=${title}&prop=pageimages&pithumbsize=100&pilicense=any`)
            .pipe(
                retry(2),
                take(1)
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
