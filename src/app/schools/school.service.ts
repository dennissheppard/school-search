import { Injectable } from 'angular2/core';
import { Http, Response } from 'angular2/http';
import { Observable } from 'rxjs/Observable';
import { ConstantsService } from '../shared/services/constants.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

@Injectable()
export class SchoolService {
    constructor(private http: Http, private constants: ConstantsService){

    }

    getSchools(){
        return this.http.get(this.constants.serviceUrl + 'institutions/')
            .map(
                (response: Response) => <any[]>response.json().results
            )
            .catch(this.handleError);
    }

    handleError(error: any){
        console.log(error);
    }


}
