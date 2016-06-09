import { Component } from '@angular/core';
import {CORE_DIRECTIVES, DecimalPipe} from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { SchoolListComponent } from './school-list/school-list.component';
import { SchoolService, School } from "./services/school.service";
import {SchoolDetailComponent} from "./school-detail/school-detail.component";
import {Callout} from "./services/callout";

@Component({
    selector: 'school-search',
    templateUrl: 'src/app/schools/school-search.html',
    providers: [SchoolService, DecimalPipe],
    directives: [SchoolListComponent, SchoolDetailComponent]
})
export class SchoolSearchComponent{
    schoolDetails: Array<any> = [];
    selectedSchool: School = {
        name: '',
        total_costs_out_of_state: 0,
        details: {},
        id: -1,
        population: 0
    };

    calloutData = {
        admissionData: <Callout> new Callout(),
        costData: <Callout> new Callout(),
        deadlineData: <Callout> new Callout(),
        populationData: <Callout> new Callout()
    };

    constructor(private schoolService: SchoolService){}
    
    getSchoolDetails(selectedSchool: School){
        this.selectedSchool = selectedSchool;
        this.schoolService.getSchoolDetails(selectedSchool.id)
            .subscribe((schoolDetails: any) => {
                this.selectedSchool.details = schoolDetails;
                this.schoolService.selectedSchool = this.selectedSchool;
                this.fillDetailsArray(this.selectedSchool.details);
                this.setupCalloutData();
            });
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

        this.calloutData.admissionData = {
            dataPoint: this.selectedSchool.details.details[0].admission_rate
                ? this.selectedSchool.details.details[0].admission_rate * 1 + '%'
                : 0 + '%',
            iconClass: 'fa-ticket',
            dataLabel: 'Admission Rate',
            panelClass: 'panel-primary'
        }

        this.calloutData.costData = {
            dataPoint: new DecimalPipe().transform(this.selectedSchool.total_costs_out_of_state),
            iconClass: 'fa-dollar',
            dataLabel: 'Admission Cost',
            panelClass: 'panel-green'
        }
        this.calloutData.deadlineData = {
            dataPoint: '12',
            iconClass: 'fa-calendar',
            dataLabel: 'Days Until Deadline',
            panelClass: 'panel-yellow'
        },
        this.calloutData.populationData = {
           dataPoint: new DecimalPipe().transform(this.selectedSchool.population),
           iconClass: 'fa-group',
           dataLabel: 'Student Population',
           panelClass: 'panel-red'
        }
    }


}