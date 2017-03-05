import {Injectable} from "@angular/core";
import {Data} from "./data";
import {Http, Headers} from "@angular/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

@Injectable()
export class AppService {

  constructor(private http: Http){}
  lists: Data[] = [];

  getData(): Observable<any> {
    let jsonHeaders= new Headers({
      'Content-Type': 'application/json'
    })
    return this.http.get('http://localhost:9000/get/all',{headers:jsonHeaders})
      .map((response:any)=> {
      return this.extractData(response)
    });
  }

  addTask(todo: Data): Observable<any> {
    let jsonHeaders= new Headers({
      'Content-Type': 'application/json'
    })
    let obj={
      date: todo.date,
      title: todo.title,
      description: todo.description,
      priority: todo.priority
    };
    return this.http.post('http://localhost:9000/add',obj,{headers:jsonHeaders})
      .map((response:any)=> {
      return this.extractData(response)
    }).catch((e:any) => {
      alert("error");
      return this.handle(e);
    });
  }

  updateTask(todo: Data): Observable<any> {
    let jsonHeaders= new Headers({
      'Content-Type': 'application/json'
    })
    let obj={
      _id: todo._id,
      date: todo.date,
      title: todo.title,
      description: todo.description,
      priority: todo.priority
    };
    return this.http.post('http://localhost:9000/update',obj,{headers:jsonHeaders})
      .map((response:any)=> {
      return this.extractData(response)
    }).catch((e:any) => {
      alert("error");
      return this.handle(e);
    });

  }

  deleteTask(_id: any): Observable<any>  {
    let jsonHeaders= new Headers({
      'Content-Type': 'application/json'
    })
    return this.http.get('http://localhost:9000/remove/' + _id,{headers:jsonHeaders})
      .map((response:any)=> {
      return this.extractData(response)
    });
  }

  extractData(res:any){
    let body= res.json();
    return body;
  }

  private handle(error: any) {
    let errMsg: string;
    try {
      if (JSON.parse(error._body).message) {
        errMsg = JSON.parse(error._body).message
      } else {
        errMsg = 'Some thing went wrong';
      }

    }
    catch (e) {
      errMsg = 'Somthing Went Wrong try again!!'
    }
    return Observable.throw(new Error(errMsg));
  }
}
