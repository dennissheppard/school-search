import { Injectable } from 'angular2/core';
import { Http, Response } from 'angular2/http';
import { Observable } from 'rxjs/Observable';
import { ConstantsService } from '../../shared/services/constants.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import {Subject} from "rxjs/Subject";

export interface School{
    "name": String;
    "total_costs_out_of_state": Number;
    "id": number;
}

@Injectable()
export class SchoolService {
    selectedSchool: School;

    // Observable string sources
    private _onSelectedSchoolChange = new Subject<School>();

    // Observable string streams
    schoolChanged$ = this._onSelectedSchoolChange.asObservable();

    constructor(private http: Http, private constants: ConstantsService){

    }

    // Service message commands
    setSelectedSchool(school: School) {
        this.selectedSchool = school;
        this._onSelectedSchoolChange.next(school)
    }

    getSchools(searchTerm: string = ''){
        return this.http.get(this.constants.serviceUrl + 'institutions/?search=' + searchTerm)
            .map(
                (response: Response) => <School[]>response.json().results
            )
            .catch(this.handleError);
    }

    handleError(error: any){
        console.log(error);
    }

    getSchoolDetails(id: number){
        return this.http.get(this.constants.serviceUrl + 'institutions/' + id)
            .map(
                (response: Response) => <any>response.json()
            )
            .catch(this.handleError);
    }




}
