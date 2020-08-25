import { ApiService } from "./api.service";
import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { peoples } from './peoples.mock';
import { environment } from 'src/environments/environment';
import { IPeople } from '../models/peoples';

describe('ApiService', () => {

    let httpMock: HttpTestingController;
    let apiService: ApiService;

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ApiService]
        });

        apiService = TestBed.get(ApiService);
        httpMock = TestBed.get(HttpTestingController);

    });

    it('getPeople() should http GET people', () => {

        const peoplesList: Array<IPeople> = peoples;

        apiService.getPeople().subscribe((res) => {
            expect(res).toEqual(peoplesList);
        });

        const req = httpMock.expectOne(environment.apiUrl + '/people.json');
        expect(req.request.method).toEqual("GET");
        req.flush(peoplesList);

        httpMock.verify();
    });

});