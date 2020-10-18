import { Component, OnInit } from '@angular/core';
import { ITodoist } from 'src/app/_shared/models/todoist.model';
import { TodoistService } from 'src/app/_shared/services/todoist.service';

@Component({
  selector: 'app-create-todo-dialog',
  templateUrl: './create-todo-dialog.component.html',
  styleUrls: ['./create-todo-dialog.component.scss']
})
export class CreateTodoDialogComponent implements OnInit {

  constructor(
    private todoistService: TodoistService
  ) { }

  ngOnInit(): void {
  }

  public submit(): void {
    const data: ITodoist = {
      name: 'Why board type not working?',
      createdDate: new Date(),
      modifiedDate: new Date(),
      scheduleDate: new Date(),
      isFinished: true,
      boardType: 'todo'
    };

    this.todoistService.create(data).subscribe();
  }

}
