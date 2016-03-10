import { Component, Input, EventEmitter } from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';
import { RouterLink } from 'angular2/router';
import { Observable } from 'rxjs/Observable';
import { SchoolService, School } from '../services/school.service';
import {Subscription} from "rxjs/Subscription";

@Component({
    selector: 'school-detail',
    templateUrl: 'app/schools/school-detail/school-detail.html',
    providers: [],
    directives: []
})
export class SchoolDetailComponent{
    selectedSchool: School = {
        name: '',
        total_costs_out_of_state: 0,
        id: -1
    };
    subscription: Subscription;
    schoolDetails: any[] = [];


    constructor(private schoolService: SchoolService){
        this.setupSelectedSchoolListener();
    }



    setupSelectedSchoolListener(){
        this.subscription = this.schoolService.schoolChanged$.subscribe(
            (school: School) => {
                this.selectedSchool = school;
                this.getSchoolDetails(school.id);

            });
    }

    getSchoolDetails(id: number){
        this.schoolService.getSchoolDetails(id)
            .subscribe(
                (schoolDetails: any) => {
                    this.selectedSchool.details = schoolDetails;
                    this.schoolService.selectedSchool = this.selectedSchool;
                    this.fillDetailsArray(this.selectedSchool.details);
                }
            );
    }

    fillDetailsArray(school: any){
        for (var key in school) {
            if (school.hasOwnProperty(key)) {
                var value = school[key] + '';
                this.schoolDetails.push({
                    "key": key,
                    "value": (value).substring(0, value.length > 40 ? 40 : value.length)
                });
            }
        }
    }


}
