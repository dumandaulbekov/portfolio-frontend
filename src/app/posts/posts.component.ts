import { Component, OnInit } from '@angular/core';
import { PostService } from '../_shared/services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  constructor(
    private postsService: PostService
  ) { }

  ngOnInit(): void {
  }

}
