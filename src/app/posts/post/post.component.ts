import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { IPost } from 'src/app/_shared/models/post.model';
import { PostService } from 'src/app/_shared/services/post.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  post$: Observable<IPost>;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) { }

  ngOnInit(): void {
    this.post$ = this.route.params.pipe(
      switchMap((params: Params) => {
        return this.postService.getById(params[`id`]);
      })
    );
  }

}
