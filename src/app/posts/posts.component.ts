import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IPost } from '../_shared/models/post.model';
import { PostService } from '../_shared/services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  public posts: IPost[] = [];

  constructor(
    private postsService: PostService
  ) { }

  ngOnInit(): void {
    this.postsService.getAll().subscribe({
      next: (response) => this.posts = response.reverse(),
      error: (error: HttpErrorResponse) => console.log('post get all error', error)
    });
  }

}
