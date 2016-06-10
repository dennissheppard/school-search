import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ConstantsService } from '../../shared/services/constants.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';
import 'rxjs/add/operator/do';
import {Subject} from "rxjs/Subject";
import {DecimalPipe} from "@angular/common";
import {Callout} from "./callout";

export interface School{
    "name": String;
    "total_costs_out_of_state": Number;
    "id": number;
    "details": any;
}

@Injectable()
export class SchoolService {
    selectedSchool: any;
    schoolList: Array<School>;
    schoolDetails: any[] = [];

    constructor(private http: Http, private constants: ConstantsService){
        this.selectedSchool = {
            name: '',
            id: -1,
            population: 0

        }
    }

    // Service message commands
    setSelectedSchool(school: any) {
        this.selectedSchool.school = school;
        this.getSchoolDetails(this.selectedSchool.school.id)
            .subscribe((details: any) => {
                this.selectedSchool.school.details = details;
            });
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
                    this.fillDetailsArray(schoolDetail);
                    this.setupCalloutData();
                    return schoolDetail;
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
        this.selectedSchool.admissionData = {
            dataPoint: this.selectedSchool.details.details[0].admission_rate
                ? this.selectedSchool.details.details[0].admission_rate * 1 + '%'
                : 0 + '%',
            iconClass: 'fa-ticket',
            dataLabel: 'Admission Rate',
            panelClass: 'panel-primary'
        }

        this.selectedSchool.costData = {
            dataPoint: new DecimalPipe().transform(this.selectedSchool.total_costs_out_of_state),
            iconClass: 'fa-dollar',
            dataLabel: 'Admission Cost',
            panelClass: 'panel-green'
        }
        this.selectedSchool.deadlineData = {
            dataPoint: '12',
            iconClass: 'fa-calendar',
            dataLabel: 'Days Until Deadline',
            panelClass: 'panel-yellow'
        }
        this.selectedSchool.populationData = {
           dataPoint: new DecimalPipe().transform(this.selectedSchool.population),
           iconClass: 'fa-group',
           dataLabel: 'Student Population',
           panelClass: 'panel-red'
        }        
    }
}
