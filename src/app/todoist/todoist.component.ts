import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ITodoist } from '../_shared/models/todoist.model';
import { TodoistService } from '../_shared/services/todoist.service';
import { CreateTodoDialogComponent } from './create-todo-dialog/create-todo-dialog.component';

@Component({
  selector: 'app-todoist',
  templateUrl: './todoist.component.html',
  styleUrls: ['./todoist.component.scss']
})
export class TodoistComponent implements OnInit {
  todo = [
    'Add text for about',
    'Create first post',
    'Reread docs about php'
  ];

  test = [
    'Fall asleep',
  ];

  done = [
    'Check e-mail',
    'Create template for todoist',
  ];

  constructor(
    private todoistService: TodoistService,
    public dialog: MatDialog

  ) { }

  ngOnInit(): void {
  }

  public drop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  public createTodoDialog(): void {
    const dialogRef = this.dialog.open(CreateTodoDialogComponent,{ 
      width: '560px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
