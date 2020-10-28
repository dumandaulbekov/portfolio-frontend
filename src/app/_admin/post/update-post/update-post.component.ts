import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { IPost } from 'src/app/_shared/models/post.model';
import { PostService } from 'src/app/_shared/services/post.service';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.scss']
})
export class UpdatePostComponent implements OnInit {
  public postForm: FormGroup;
  public postFormControls: {
    title: AbstractControl,
    content: AbstractControl
  };

  public post: IPost;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private postService: PostService,
    private router: Router,
  ) {
    this.createPostForm();
  }

  ngOnInit(): void {
    this.fillForm();
  }

  private fillForm(): void {
    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.postService.getById(params[`id`]);
      })
    ).subscribe((post: IPost) => {
      this.post = post;
      this.postFormControls.title.setValue(post.title);
      this.postFormControls.content.setValue(post.content);
    });
  }

  private createPostForm(): void {
    this.postForm = this.formBuilder.group({
      title: [null, [Validators.required, Validators.maxLength(200)]],
      content: [null, [Validators.required]],
    });

    this.postFormControls = {
      title: this.postForm.get('title'),
      content: this.postForm.get('content'),
    };
  }

  public submitPostForm(): void {
    if (this.postForm.valid && this.postForm.dirty) {
      const body: IPost = {
        id: this.post.id,
        title: this.postFormControls.title.value?.trim(),
        content: this.postFormControls.content.value?.trim(),
      };

      this.postService.update(body).subscribe({
        next: () => this.router.navigate(['/post', this.post.id]),
        error: (error: HttpErrorResponse) => console.log('post edit error', error)
      });
    }
  }
}
