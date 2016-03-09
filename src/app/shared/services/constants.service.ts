import { Injectable } from 'angular2/core';

@Injectable()
export class ConstantsService{
    serviceUrl: String;

    constructor(){
        this.serviceUrl = 'https://api.nexttiereducation.com/v1/';
    }
}