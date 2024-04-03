import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, retry, take} from 'rxjs';
import {F1Service} from './f1.service';

export interface WikiResponse {
    batchcomplete: string
    query: Query
}

export interface Query {
    normalized: { from: string, to: string }[]
    pages: Record<string, Page>
}

export interface Page {
    pageid: number
    ns: number
    title: string
    thumbnail?: Thumbnail
    pageimage?: string
    extract?: string
}

export interface Thumbnail {
    source: string
    width: number
    height: number
}

@Injectable({
    providedIn: 'root'
})
export class WikiService {

    image$ = new BehaviorSubject<string>('');

    description$ = new BehaviorSubject<string>('');

    private corsAnywhereUrl = "https://cors-anywhere.herokuapp.com/";
    getImage(title: string) {
        this.http.get<WikiResponse>(`${this.corsAnywhereUrl}https://en.wikipedia.org/w/api.php?action=query&format=json&titles=${title}&prop=pageimages&pithumbsize=100&pilicense=any`)
            .pipe(
                retry(2),
                take(1)
            )
            .subscribe(response => {
                for (const key in response.query.pages) {
                    if (response.query.pages.hasOwnProperty(key)) {
                        const imageUrl = response.query.pages[key].thumbnail?.source;
                        if(imageUrl){
                            this.image$.next(imageUrl);
                        }
                    }
                }
            })
    }

    getDescription(title: string) {
        this.http.get<WikiResponse>(`${this.corsAnywhereUrl}https://en.wikipedia.org/w/api.php?action=query&titles=${title}&prop=extracts&exintro&explaintext&format=json`)
            .pipe(
                retry(2),
                take(1)
            )
            .subscribe(response => {
                for (const key in response.query.pages) {
                    if (response.query.pages.hasOwnProperty(key)) {
                        const extract = response.query.pages[key].extract;
                        if(extract){
                            this.description$.next(extract);
                        }
                    }
                }
            })
    }

    sub = this.f1Service.results$.subscribe(results => {
        if (results.length > 0) {
            const url = results[0].Driver.url
            const strippedString = url.substring(url.lastIndexOf('/') + 1);
            this.getImage(strippedString)
            this.getDescription(strippedString)
        }
    })

    constructor(private http: HttpClient, private f1Service: F1Service) {

    }

}
