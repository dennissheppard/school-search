import { Inject } from 'angular2/core';
import { Http, Response } from 'angular2/http';
import { Observable } from 'rxjs/Observable';

@Inject()
export class ConstantsService{
    serviceUrl: String;

    constructor(){
        this.serviceUrl = 'stg.nexttier.com/api/v1'
    }
}