import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ITodoChangeName } from 'src/app/_shared/models/todoist.model';
import { TodoistService } from 'src/app/_shared/services/todoist.service';

@Component({
  selector: 'app-edit-todo-dialog',
  templateUrl: './edit-todo-dialog.component.html',
  styleUrls: ['./edit-todo-dialog.component.scss']
})
export class EditTodoDialogComponent implements OnInit {
  public todoForm: FormGroup;
  public todoFormControls: {
    name: AbstractControl,
  };

  constructor(
    private readonly todoistService: TodoistService,
    private readonly formBuilder: FormBuilder,
    private readonly dialogRef: MatDialogRef<EditTodoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly dialogData: ITodoChangeName,

  ) {
    this.todoForm = this.formBuilder.group({
      name: [null, [Validators.required]],
    });

    this.todoFormControls = {
      name: this.todoForm.get('name'),
    };
  }

  ngOnInit(): void {
    this.todoFormControls.name.setValue(this.dialogData.name);
  }

  public submitTodoForm(): void {
    if (this.todoForm.valid) {
      const body: ITodoChangeName = {
        id: this.dialogData.id,
        name: this.todoFormControls.name.value?.trim(),
      };

      this.todoistService.editName(body).subscribe({
        next: () => this.dialogRef.close(body),
        error: (error: HttpErrorResponse) => console.log('todo edit error', error)
      });
    }
  }
}
