import {CreateTaskComponent} from "./createTask.component";
import {RouterOutletMap, Router, NavigationExtras,ActivatedRoute} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {async, TestBed, ComponentFixture} from "@angular/core/testing";
import {By}           from '@angular/platform-browser';
import {DebugElement} from "@angular/core";
import {AppService} from "../app.service";
import {HttpModule} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/of";

describe('CreateTaskComponent', function () {
  let de: DebugElement;
  let comp: CreateTaskComponent;
  let fixture: ComponentFixture<CreateTaskComponent>;
  let service: AppService;
  let router: Router;

  class MockRouter {
    navigate():Promise<boolean>{
      return Promise.resolve(true)
    }
  }
  class MockActivatedRoute{

  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateTaskComponent],
      providers: [{provide: Router, useClass: MockRouter},{provide : ActivatedRoute, useClass: MockActivatedRoute}, AppService],
      imports: [RouterTestingModule, CommonModule, FormsModule, HttpModule]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTaskComponent);
    comp = fixture.componentInstance;

    de = fixture.debugElement.query(By.css('h1'));
    service = fixture.debugElement.injector.get(AppService);
    router = fixture.debugElement.injector.get(Router);
  });

  it('should create component', () => expect(comp).toBeDefined());

  it('should insert data to service',() =>{
    spyOn(window, "alert");

    spyOn(service,'addTask').and.returnValue(
      Observable.of<any>(
        [{
          date: '',
          title: '',
          description: '',
          priority: '',
          _id: ''
        }]
      )
    );
    comp.submit();
    expect(window.alert).toHaveBeenCalledWith('Insert completed');
    router.navigate([]).then(data => {
      expect(data).toBe(true);
    })

  });
});
