import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CountryService {

    // ISO 3166 Alpha-2 Format: [Country Name] : [2 letter Country Code]
    getCountryCode(country: string): string {
        return this.countryList[country];
    }

    private countryList: { [key: string]: string } = {
        American: 'US',
        Argentine: 'AR',
        Australian: 'AU',
        Austrian: 'AT',
        Belgian: 'BE',
        Brazilian: 'BR',
        British: 'GB',
        Canadian: 'CA',
        Colombian: 'CO',
        Danish: 'DK',
        Dutch: 'NL',
        Finnish: 'FI',
        French: 'FR',
        German: 'DE',
        Indonesian: 'ID',
        Irish: 'IE',
        Italian: 'IT',
        Japanese: 'JP',
        Mexican: 'MX',
        Monegasque: 'MC',
        'New Zealander': 'NZ',
        Russian: 'RU',
        'South African': 'ZA',
        Spanish: 'ES',
        Swedish: 'SE',
        Swiss: 'CH',
        Thai: 'TH',
        Venezuelan: 'VE'
    }
}
