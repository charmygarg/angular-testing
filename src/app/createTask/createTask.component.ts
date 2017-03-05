import {Component, OnInit} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {AppService} from "../app.service";
import {Data} from "../data";

@Component ({
  moduleId: module.id,
  selector: 'createTask',
  templateUrl: './createTask.component.html',
  styleUrls: ['./createTask.component.css']
})

export class CreateTaskComponent implements OnInit {

  toDoList: Data[] = [];
  todo: Data = new Data('','','','');
  index: number;
  private sub: any;

  constructor(private router: Router, private route: ActivatedRoute, private service: AppService) {
  }

  ngOnInit() {
    //this.toDoList = this.service.lists;
    this.sub = this.route.params.subscribe((data: any) => {
      this.index = +data.i;
      if(this.index||this.index===0) {
        this.service.getData().subscribe((data: any) => {
            //this.toDoList = data;
            this.todo = data[this.index];
        },
          (err: any) => alert(err), () => {
            //alert('success');
          });
      }
    });

  }

  submit() {
    if(this.index||this.index==0) {
      this.service.updateTask(this.todo).subscribe((data: any) => {
        },
        (e: any) => {
          alert(e);

        });
    }else{
      this.service.addTask(this.todo).subscribe((data: any) => {
        },
        (e: any) => {
          alert(e);
        },
        () => {
          // alert("completed")
        }
      );
    }
    this.router.navigate(['showTask'])
  }

}
