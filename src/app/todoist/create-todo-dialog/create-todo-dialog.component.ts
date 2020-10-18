import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ITodoist } from 'src/app/_shared/models/todoist.model';
import { TodoistService } from 'src/app/_shared/services/todoist.service';

@Component({
  selector: 'app-create-todo-dialog',
  templateUrl: './create-todo-dialog.component.html',
  styleUrls: ['./create-todo-dialog.component.scss']
})
export class CreateTodoDialogComponent implements OnInit {
  public todoForm: FormGroup;
  public todoFormControls: {
    name: AbstractControl,
  };

  constructor(
    private todoistService: TodoistService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
  ) {
    this.todoForm = this.formBuilder.group({
      name: [null, [Validators.required]],
    });

    this.todoFormControls = {
      name: this.todoForm.get('name'),
    };
  }

  ngOnInit(): void {
  }

  public submitTodoForm(): void {
    if (this.todoForm.valid) {
      const body: ITodoist = {
        name: this.todoFormControls.name.value?.trim(),
        createdDate: new Date(),
        modifiedDate: new Date(),
        scheduleDate: new Date(),
        boardType: 'todo',
        isFinished: false
      };

      this.todoistService.create(body).subscribe();

      this.dialog.closeAll();
    }
  }
}
