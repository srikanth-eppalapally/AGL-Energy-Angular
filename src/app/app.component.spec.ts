import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { CatsComponent } from './components/cats/cats.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api.service';

describe('AppComponent', () => {
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
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});
