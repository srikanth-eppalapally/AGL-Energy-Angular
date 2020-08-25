import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { IPeople } from '../../models/peoples';

@Component({
    selector: 'app-cats',
    templateUrl: './cats.component.html',
    styleUrls: ['./cats.component.scss']
})
export class CatsComponent implements OnInit {

    peoplesList: Array<IPeople>;
    genderWiseCatsList: object;

    constructor(private apiService: ApiService) {

    }

    ngOnInit() {
        this.loadPeoplesData();

    }

    /**
     * @description subscribes to getPeople observable in apiService and calls transformPeople method
     */

    loadPeoplesData(): void {
        this.apiService.getPeople().subscribe((resp: Array<IPeople>) => {
            this.peoplesList = resp;
            this.transformPeoplesList();
        });
    }

    /**
     * @description transform peoples list to gender wise cats lists in alphabetical order
     */

    transformPeoplesList(): void {
        const genderGroups = this.peoplesList.reduce((acc: object, people: IPeople) => {
            if (!acc[people.gender]) acc[people.gender] = [];
            acc[people.gender].push(people);
            return acc;
        }, {});
        const genderWiseCats = {};
        Object.keys(genderGroups).forEach(gender => {
            genderWiseCats[gender] = [];
            genderGroups[gender].forEach(people => {
                if (people.pets && people.pets.length) {
                    let cats = people.pets.filter(pet => pet.type === 'Cat');
                    genderWiseCats[gender].push(...cats);
                }

            });
            genderWiseCats[gender].sort((a, b) => a.name.localeCompare(b.name));
        });
        this.genderWiseCatsList = Object.assign({}, genderWiseCats);
    }


}
