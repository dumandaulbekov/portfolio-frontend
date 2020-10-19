import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IPost } from 'src/app/_shared/models/post.model';
import { PostService } from 'src/app/_shared/services/post.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public posts: IPost[] = [];

  constructor(
    private postsService: PostService
  ) { }

  ngOnInit(): void {
    this.postsService.getAll().subscribe({
      next: (response) => this.posts = response,
      error: (error: HttpErrorResponse) => console.log('post get all error', error)
    });
  }

  public remove(id: number): void {
    this.postsService.delete(id).subscribe(() => {
      this.posts = this.posts.filter((post) => post.id !== id);
    });
  }
}
