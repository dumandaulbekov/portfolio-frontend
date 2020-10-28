import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ITodoChangeBoardType, ITodoChangeName, ITodoist } from '../_shared/models/todoist.model';
import { TodoistService } from '../_shared/services/todoist.service';
import { CreateTodoDialogComponent } from './create-todo-dialog/create-todo-dialog.component';
import { EditTodoDialogComponent } from './edit-todo-dialog/edit-todo-dialog.component';

@Component({
  selector: 'app-todoist',
  templateUrl: './todoist.component.html',
  styleUrls: ['./todoist.component.scss']
})
export class TodoistComponent implements OnInit {
  public todo: ITodoist[] = [];
  public progress: ITodoist[] = [];
  public done: ITodoist[] = [];

  constructor(
    private readonly todoistService: TodoistService,
    private readonly dialog: MatDialog

  ) { }

  ngOnInit(): void {
    this.todoistService.getAll().subscribe({
      next: (todoist) => {
        todoist.forEach((todo) => {
          if (todo.boardType === 'todo') {
            this.todo.push(todo);
          }

          if (todo.boardType === 'progress') {
            this.progress.push(todo);
          }

          if (todo.boardType === 'done') {
            this.done.push(todo);
          }
        });
      },

      error: (error: HttpErrorResponse) => console.log('todo get all error', error)
    });
  }

  public drop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const todo = event.previousContainer.data[event.previousIndex];

      event.container.data.map((x) => {
        if (x[`boardType`] === 'todo') {
          const update: ITodoChangeBoardType = {
            id: todo[`id`],
            boardType: 'todo'
          };

          this.todoistService.editBoardType(update).subscribe((value) => {
            todo[`boardType`] = value.boardType;
          });
        }

        if (x[`boardType`] === 'progress') {
          const update: ITodoChangeBoardType = {
            id: todo[`id`],
            boardType: 'progress'
          };

          this.todoistService.editBoardType(update).subscribe((value) => {
            todo[`boardType`] = value.boardType;
          });
        }

        if (x[`boardType`] === 'done') {
          const update: ITodoChangeBoardType = {
            id: todo[`id`],
            boardType: 'done'
          };

          this.todoistService.editBoardType(update).subscribe((value) => {
            todo[`boardType`] = value.boardType;
          });
        }
      });

      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  public createTodoDialog(): void {
    const dialogRef = this.dialog.open(CreateTodoDialogComponent, {
      width: '560px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.todo.push(result);
      }
    });
  }

  public editTodoDialog(todo: ITodoChangeName, boardType: 'todo' | 'progress' | 'done'): void {
    const dialogRef = this.dialog.open(EditTodoDialogComponent, {
      width: '560px',
      data: todo
    });

    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        switch (boardType) {
          case 'todo':
            this.todo.map((x) => {
              if (x.id === response.id) {
                x.name = response.name;
                x.modifiedDate = response.modifiedDate;
              }
            });
            break;
          case 'progress':
            this.progress.map((x) => {
              if (x.id === response.id) {
                x.name = response.name;
                x.modifiedDate = response.modifiedDate;
              }
            });
            break;
          case 'done':
            this.done.map((x) => {
              if (x.id === response.id) {
                x.name = response.name;
                x.modifiedDate = response.modifiedDate;
              }
            });
            break;
        }
      }
    });
  }

  public deleteTodo(todoId: number, boardType: 'todo' | 'progress' | 'done'): void {
    this.todoistService.delete(todoId).subscribe(() => {
      switch (boardType) {
        case 'todo':
          this.todo = this.todo.filter((todo) => todo.id !== todoId);
          break;
        case 'progress':
          this.progress = this.progress.filter((todo) => todo.id !== todoId);
          break;
        case 'done':
          this.done = this.done.filter((todo) => todo.id !== todoId);
          break;
      }
    });
  }

}
