import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { SchoolService, School } from '../services/school.service';
import { FilterComponent } from './school-filter/filter.component';

@Component({
    selector: 'school-list',
    templateUrl: 'src/app/schools/school-list/school-list.html',
    providers: [],
    directives: [FilterComponent]
})
export class SchoolListComponent implements OnInit{
    selectedSchool: School = {
        name: '',
        total_costs_out_of_state: 0,
        details: {},
        id: -1
    };
    featuredSchool: number = 12;
    schools: School[] = [];
    

    constructor(private schoolService: SchoolService){

    }

    ngOnInit(){
        this.getSchools();
    }

    //DOM methods
    setSelectedSchool(school: School){
        this.selectedSchool = school;
        this.schoolService.setSelectedSchool(school);
    }

    //private methods
    getSchools(searchText: string = ''){
        this.schoolService.getSchools(searchText)
        .subscribe(
            (schools: School[]) => {
                this.schools = schools;
                if(schools.length > 0){
                    this.schoolService.setSelectedSchool(this.schools[this.featuredSchool]);
                    this.selectedSchool = this.schools[this.featuredSchool];
                } else{
                    delete this.selectedSchool;
                }
                this.featuredSchool = 0;

            }
        );
    }
}