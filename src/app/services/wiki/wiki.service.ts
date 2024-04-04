import {Injectable} from '@angular/core';
import {F1ResultService} from '../f1/f1-result.service';
import {WikiImageService} from './wiki-image.service';
import {WikiDescriptionService} from './wiki-description.service';
import {Subject} from 'rxjs';
import {F1Service} from '../f1/f1.service';


export const corsAnywhereUrl = 'https://cors-anywhere.herokuapp.com/';

@Injectable({
    providedIn: 'root'
})
export class WikiService {

    private imageSub = this.wikiImage.image$.subscribe(image => this.image$.next(image))
    image$ = new Subject<string>()

    private descriptionSub = this.wikiDesc.description$.subscribe(desc => this.description$.next(desc))
    description$ = new Subject<string>();

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
        this.imageSub.unsubscribe();
        this.descriptionSub.unsubscribe();
        this.resultSub.unsubscribe();
    }

}
