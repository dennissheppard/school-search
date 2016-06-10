import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ConstantsService } from '../../shared/services/constants.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';
import 'rxjs/add/operator/do';
import {Subject} from "rxjs/Subject";

export interface School{
    "name": String;
    "total_costs_out_of_state": Number;
    "id": number;
    "details": any;
    "population": any;
}

@Injectable()
export class SchoolService {
    selectedSchool: School;
    schoolList: Array<School>;

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
                (response: Response) =>{
                    this.schoolList = response.json().results;
                    return this.schoolList;
                });

    }

    handleError(error: any){
        console.log(error);
    }

    getSchoolDetails(id: number){
        return this.http.get(this.constants.serviceUrl + 'institutions/' + id)
            .map((response: Response) => {
                    let schoolDetail: School = response.json();
                    return schoolDetail;
                }
            );
    }
}
