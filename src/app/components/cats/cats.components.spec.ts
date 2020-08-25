import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from 'src/app/app.component';
import { CatsComponent } from './cats.component';
import { ApiService } from 'src/app/services/api.service';
import { peoples } from 'src/app/services/peoples.mock';
import { delay } from 'rxjs/operators';
import * as Rx from 'rxjs';


describe('CatsComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        HttpClientModule
      ],
      declarations: [
        AppComponent,
        CatsComponent
      ],
      providers: [ApiService]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(CatsComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should call loadPeoplesData and get response as array', fakeAsync(() => {
    const fixture = TestBed.createComponent(CatsComponent);
    const component = fixture.debugElement.componentInstance;
    const service = fixture.debugElement.injector.get(ApiService);
    let spy_getPeople = spyOn(service, "getPeople").and.callFake(() => {
      return Rx.of(peoples).pipe(delay(2000));
    });
    component.loadPeoplesData();
    tick(1000);
    tick(1000);
    expect(component.peoplesList).toEqual(peoples);
  }))

  it('should call transformPeoplesList and get genderWiseCatsList', fakeAsync(() => {
    const fixture = TestBed.createComponent(CatsComponent);
    const component = fixture.debugElement.componentInstance;
    component.peoplesList = peoples;
    component.transformPeoplesList();
    const genderwiselist = {"Male":[{"name":"Garfield","type":"Cat"},{"name":"Jim","type":"Cat"},{"name":"Max","type":"Cat"},{"name":"Tom","type":"Cat"}],"Female":[{"name":"Garfield","type":"Cat"},{"name":"Simba","type":"Cat"},{"name":"Tabby","type":"Cat"}]};
    expect(component.genderWiseCatsList).toEqual(genderwiselist);
  }));

  it('should call transformPeoplesList and render female gender pet cats list', fakeAsync(() => {
    const fixture = TestBed.createComponent(CatsComponent);
    const service = fixture.debugElement.injector.get(ApiService);
    const component = fixture.debugElement.componentInstance;
    let spy_getPeople = spyOn(service, "getPeople").and.callFake(() => {
      return Rx.of(peoples);
    });
    component.loadPeoplesData();
    
    
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    
    let listElements = compiled.querySelectorAll('.Female li');
    expect(listElements.length).toEqual(3);
  }));

  it('should call transformPeoplesList and render male gender pet cats list', fakeAsync(() => {
    const fixture = TestBed.createComponent(CatsComponent);
    const service = fixture.debugElement.injector.get(ApiService);
    const component = fixture.debugElement.componentInstance;
    let spy_getPeople = spyOn(service, "getPeople").and.callFake(() => {
      return Rx.of(peoples);
    });
    component.loadPeoplesData();


    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    let listElements = compiled.querySelectorAll('.Male li');
    expect(listElements.length).toEqual(4);
  }));

});


