import { Injectable } from '@angular/core';

@Injectable()
export class ConstantsService{
    serviceUrl: String;

    constructor(){
        this.serviceUrl = 'https://api.nexttiereducation.com/v1/';
    }
}