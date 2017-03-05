import {Component, OnInit} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {Data} from "../data";
import {AppService} from "../app.service";

@Component({
  moduleId: module.id,
  selector: 'showTask',
  templateUrl: './showTask.component.html',
  styleUrls: ['./showTask.component.css']

})

export class ShowTaskComponent implements OnInit {

  toDoList: Data[] = [];
  index: number;

  constructor(private router: Router, private route: ActivatedRoute, private service: AppService) {
  }

  ngOnInit() {
    this.toDoList = this.service.lists;

    this.service.getData().subscribe((data :any)=>{
        this.toDoList = data;
      },
      (e:any)=> {
        alert(e);

      },
      ()=>
      {
        //alert("completed")
      }
    );
  }

  deleteToDo(index: number) {
    //this.service.lists.splice(index,1)
    this.service.deleteTask(this.toDoList[index]._id).subscribe((data: any) => {
        this.service.getData().subscribe((data :any)=>{
            this.toDoList = data;
          },
          (e:any)=> {
            alert(e);

          });
      },
      (e: any) => {
        alert(e);

      }
    );
  }

  editToDo(index: number) {
    this.router.navigate(['createTask',index])
  }

}
