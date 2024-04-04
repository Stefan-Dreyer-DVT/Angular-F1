import {Injectable} from '@angular/core';
import {WikiImageService} from './wiki-image.service';
import {WikiDescriptionService} from './wiki-description.service';
import {F1Service} from '../f1/f1.service';


export const corsAnywhereUrl = 'https://cors-anywhere.herokuapp.com/';

@Injectable({
    providedIn: 'root'
})
export class WikiService {

    image$ = this.wikiImage.image$;

    description$ = this.wikiDesc.description$;

    fetchArticle(urlTitle: string) {
        this.wikiImage.fetchImage(urlTitle)
        this.wikiDesc.fetchDescription(urlTitle)
    }

    //updates wiki info if Results update
    private resultSub = this.f1Service.results$.subscribe(results => {
        if (results.length > 0) {
            const url = results[0].Driver.url
            const strippedString = url.substring(url.lastIndexOf('/') + 1);
            this.fetchArticle(strippedString)
        }
    })

    constructor(
                private f1Service: F1Service,
                private wikiImage: WikiImageService,
                private wikiDesc: WikiDescriptionService) {
    }

    ngOnDestroy() {
        this.resultSub.unsubscribe();
    }

}
