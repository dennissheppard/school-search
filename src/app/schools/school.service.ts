import { Inject } from 'angular2/core';
import { Http, Response } from 'angular2/http';
import { Observable } from 'rxjs/Observable';

@Inject()
export class SchoolService{
    constructor(private http: Http, private response: Response){

    }
}