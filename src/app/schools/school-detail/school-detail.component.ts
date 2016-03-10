import { Component, Input, EventEmitter } from 'angular2/core';
import { CORE_DIRECTIVES, DecimalPipe } from 'angular2/common';
import { RouterLink } from 'angular2/router';
import { Observable } from 'rxjs/Observable';
import { SchoolService, School } from '../services/school.service';
import {Subscription} from "rxjs/Subscription";
import { DetailCalloutComponent } from './detail-callout/DetailCallout.component';

@Component({
    selector: 'school-detail',
    templateUrl: 'app/schools/school-detail/school-detail.html',
    providers: [DecimalPipe],
    directives: [DetailCalloutComponent]
})
export class SchoolDetailComponent{
    selectedSchool: School = {
        name: '',
        total_costs_out_of_state: 0,
        id: -1
    };
    subscription: Subscription;
    schoolDetails: any[] = [];
    admissionData: any = {};
    costData: any = {};
    deadlineData: any = {};
    populationData: any = {};


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

                    this.setupCalloutData();
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

    setupCalloutData(){
        this.admissionData = {
            dataPoint: this.selectedSchool.details.details[0].admission_rate
                        ? this.selectedSchool.details.details[0].admission_rate * 1 + '%'
                        : 0 + '%',
            iconClass: 'fa-ticket',
            dataLabel: 'Admission Rate',
            panelColor: 'panel-primary'
        }

        this.costData = {
            dataPoint: new DecimalPipe().transform(this.selectedSchool.total_costs_out_of_state),
            iconClass: 'fa-dollar',
            dataLabel: 'Admission Cost',
            panelColor: 'panel-green'
        }
        this.deadlineData = {
            dataPoint: 12,
            iconClass: 'fa-calendar',
            dataLabel: 'Days Until Deadline',
            panelColor: 'panel-yellow'
        }
        //this.populationData = {
        //    dataPoint: new DecimalPipe().transform(this.selectedSchool.population),
        //    iconClass: 'fa-group',
        //    dataLabel: 'Student Population',
        //    panelColor: 'panel-red'
        //}
    }


}
