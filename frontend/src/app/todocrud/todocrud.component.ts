import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-todocrud',
  templateUrl: './todocrud.component.html',
  styleUrls: ['./todocrud.component.scss']
})
export class TodocrudComponent {
  TodoArray: any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;

  task: string = "";
  currentTaskID = "";

  constructor(private http: HttpClient) {
    this.getAllTask();
  }
  ngOnInit(): void {
  }
  getAllTask() {
    this.http.get("http://localhost:9002/api/todo/")
      .subscribe((resultData: any) => {
        this.isResultLoaded = true;
        console.log(resultData.data);
        this.TodoArray = resultData.data;
      });
  }

  register() {

    let bodyData = {
      "task": this.task,
    };
    this.http.post("http://localhost:9002/api/todo/add", bodyData).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Task Created Successfully")
      this.getAllTask();
    });
  }

  setUpdate(data: any) {
    this.task = data.task;

    this.currentTaskID = data.id;

  }
  UpdateRecords() {
    let bodyData =
    {
      "task": this.task,
    };

    this.http.put("http://localhost:9002/api/todo/update" + "/" + this.currentTaskID, bodyData).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Task Updated")
      this.getAllTask();

    });
  }

  save() {
    if (this.currentTaskID == '') {
      this.register();
    }
    else {
      this.UpdateRecords();
    }
  }

  setDelete(data: any) {
    this.http.delete("http://localhost:9002/api/todo/delete" + "/" + data.id).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Task Deleted")
      this.getAllTask();
    });
  }
}
