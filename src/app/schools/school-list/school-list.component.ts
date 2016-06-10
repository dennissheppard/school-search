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
    featuredSchool: number = 12;
    schools: School[] = [];
    selectedSchool: any;

    constructor(private schoolService: SchoolService){
        this.selectedSchool = this.schoolService.selectedSchool;
    }

    ngOnInit(){
        this.getSchools();
    }

    //DOM methods
    setSelectedSchool(school: any){
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
                } else{
                    delete this.schoolService.selectedSchool;
                }
                this.featuredSchool = 0;

            }
        );
    }
}