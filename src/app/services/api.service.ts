import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IPeople } from '../models/peoples';
import { environment } from '../../environments/environment';
import { shareReplay } from 'rxjs/operators';
const CACHE_SIZE = 1;


@Injectable()
export class ApiService {
    private peoplesApi$: Observable<Array<IPeople>>;
    peoplesApiUrl = environment.apiUrl + '/people.json';
    constructor(private http: HttpClient) {

    }


    /**
     * @description creates api request to people.json 
     * @returns return Observable 
     */

    getPeople(): Observable<Array<IPeople>> {

        if (!this.peoplesApi$) {
            this.peoplesApi$ = this.http.get<Array<IPeople>>(this.peoplesApiUrl).pipe(
                shareReplay(CACHE_SIZE)
            );
        }
        return this.peoplesApi$;
    }
}