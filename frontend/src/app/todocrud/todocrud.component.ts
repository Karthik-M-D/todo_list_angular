import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'; // Import MatDialog
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
import { ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-todocrud',
  templateUrl: './todocrud.component.html',
  styleUrls: ['./todocrud.component.scss']
})
export class TodocrudComponent {
  @ViewChild('taskInput', { static: false }) taskInput!: ElementRef;

  TodoArray: any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;

  task: string = "";
  currentTaskID = "";
  date = "";

  constructor(private http: HttpClient, private dialog: MatDialog) {
    this.getAllTask();
  }
  ngOnInit(): void {
  }
  refreshWindow() {
    setTimeout(() => {
      location.reload(); // Refresh the window after a delay
    }, 3000); // Delay in milliseconds (3 seconds)
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
      "date": this.date,
    };
    this.http.post("http://localhost:9002/api/todo/add", bodyData).subscribe((resultData: any) => {
      Date
      this.showSuccessMessage("Task Created Successfully");
      this.getAllTask();
    });
  }

  showSuccessMessage(message: string): void {
    const dialogRef = this.dialog.open(SuccessDialogComponent, {
      width: '250px',
      data: { message }, // Pass the message as data to the dialog
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  setUpdate(data: any) {
    this.task = data.task;

    this.currentTaskID = data.id;

    let currentDate = new Date();
    let new_date = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()} ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;

    this.date = new_date;
    this.taskInput.nativeElement.focus();
  }
  UpdateRecords() {
    let bodyData =
    {
      "task": this.task,
      "date": this.date,
    };

    this.http.put("http://localhost:9002/api/todo/update" + "/" + this.currentTaskID, bodyData).subscribe((resultData: any) => {
      Date
      this.getAllTask();
      this.refreshWindow();
      this.showSuccessMessage("Task Updated Successfully");
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
      Date
      this.showSuccessMessage("Task Deleted Successfully");
      this.getAllTask();
    });
  }
}
