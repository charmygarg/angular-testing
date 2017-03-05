import {ShowTaskComponent} from "./showTask.component";
import {RouterOutletMap, Router} from "@angular/router";
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

describe('ShowTaskComponent', function () {
  let de: DebugElement;
  let comp: ShowTaskComponent;
  let fixture: ComponentFixture<ShowTaskComponent>;
  let service: AppService;
  let router: Router;

  class MockRouter {
    navigate():Promise<boolean>{
      return Promise.resolve(true)
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShowTaskComponent],
      providers: [{provide: Router, useClass: MockRouter}, RouterOutletMap, AppService],
      imports: [RouterTestingModule, CommonModule, FormsModule, HttpModule]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowTaskComponent);
    comp = fixture.componentInstance;

    de = fixture.debugElement.query(By.css('h1'));
    service = fixture.debugElement.injector.get(AppService);
    router = fixture.debugElement.injector.get(Router);
  });

  it('should create show component', () => expect(comp).toBeDefined());


  it('should get data from service', () => {
    spyOn(service, 'getData').and.returnValue(
      Observable.of<any>(
        [{
          date: '',
          title: '',
          description: 'd1',
          priority: '',
          _id: ''
        }]
      )
    );
    comp.ngOnInit();
    expect(comp.toDoList).toEqual([{
      date: '',
      title: '',
      description: 'd1',
      priority: '',
      _id: ''
    }])
  });

  it('should delete data from service',() =>{
    spyOn(window, "alert");
    spyOn(service,'deleteData').and.returnValue(
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
    comp.deleteToDo(0);
    expect(window.alert).toHaveBeenCalledWith('delete On index 0');
    router.navigate([]).then(data => {
      expect(data).toBe(true);
    })

  });
});
