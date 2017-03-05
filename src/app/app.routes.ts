import {Routes} from "@angular/router";
import {ShowTaskComponent} from "./showTask/showTask.component";
import {CreateTaskComponent} from "./createTask/createTask.component";

export const routes: Routes = [{

  path : 'showTask',
  component: ShowTaskComponent
},{
  path : 'createTask',
  component: CreateTaskComponent
},{
  path : 'createTask/:i',
  component: CreateTaskComponent
},{
    path : '',
    redirectTo: '/createTask',
    pathMatch: 'full'
}];
