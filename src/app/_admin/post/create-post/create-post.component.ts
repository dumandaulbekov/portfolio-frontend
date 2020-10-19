import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from 'src/app/_shared/services/post.service';
import { IPost } from '../../../_shared/models/post.model';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  public postForm: FormGroup;
  public postFormControls: {
    title: AbstractControl,
    content: AbstractControl,
  };

  constructor(
    private postService: PostService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.createPostForm();
  }

  ngOnInit(): void {

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
        title: this.postFormControls.title.value?.trim(),
        content: this.postFormControls.content.value?.trim(),
        createdDate: new Date(),
        modifiedDate: new Date(),
      };

      this.postService.create(body).subscribe({
        next: () => this.router.navigate(['/posts']),
        error: (error: HttpErrorResponse) => console.log('post create error', error)
      });
    }
  }
}
