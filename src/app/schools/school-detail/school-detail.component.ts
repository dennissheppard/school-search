import {Component, Input, EventEmitter, OnChanges} from '@angular/core';
import { CORE_DIRECTIVES, DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { SchoolService, School } from '../services/school.service';
import { Subscription } from "rxjs/Subscription";
import { DetailCalloutComponent } from './detail-callout/DetailCallout.component';
import { ICallout } from '../services/ICallout';
import {Callout} from "../services/callout";

@Component({
    selector: 'school-detail',
    templateUrl: 'src/app/schools/school-detail/school-detail.html',
    providers: [DecimalPipe],
    directives: [DetailCalloutComponent]
})
export class SchoolDetailComponent implements OnChanges{
    @Input() selectedSchool: School;

    schoolDetails: Array<any> = [];

    calloutData = {
        admissionData: <Callout> new Callout(),
        costData: <Callout> new Callout(),
        deadlineData: <Callout> new Callout(),
        populationData: <Callout> new Callout()
    };
    
    ngOnChanges(property: any){
        if(property.selectedSchool){
            this.selectedSchool = property.selectedSchool.currentValue;
            if(this.selectedSchool.id !== -1){
                this.getSchoolDetails();
            }

        }
    }

    constructor(private schoolService: SchoolService){
        
    }

    getSchoolDetails(){
        this.schoolService.getSchoolDetails(this.selectedSchool.id)
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
