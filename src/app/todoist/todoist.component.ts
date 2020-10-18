import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { ITodoist } from '../_shared/models/todoist.model';

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

  constructor() { }

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

}
