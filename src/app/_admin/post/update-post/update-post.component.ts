import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
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
    image: AbstractControl,
    content: AbstractControl
  };

  public post: IPost;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private postService: PostService
  ) {
    this.createPostForm();
  }

  ngOnInit(): void {
    this.fillForm();
  }

  fillForm(): void {
    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.postService.getById(params[`id`]);
      })
    ).subscribe((post: IPost) => {
      this.post = post;
      this.postFormControls.title.setValue(post.title);
      this.postFormControls.image.setValue(post.image);
      this.postFormControls.content.setValue(post.content);
    });
  }

  createPostForm(): void {
    this.postForm = this.formBuilder.group({
      title: [null, [Validators.required, Validators.maxLength(200)]],
      content: [null, [Validators.required, Validators.maxLength(10000)]],
      image: [null, [Validators.required, Validators.maxLength(200)]]
    });

    this.postFormControls = {
      title: this.postForm.get('title'),
      content: this.postForm.get('content'),
      image: this.postForm.get('image')
    };
  }

  submitPostForm() {
    if (this.postForm.valid && this.postForm.dirty) {
      const body: IPost = {
        id: this.post.id,
        title: this.postFormControls.title.value?.trim(),
        image: this.postFormControls.image.value?.trim(),
        content: this.postFormControls.content.value?.trim(),
        modifiedDate: new Date(),
      };

      this.postService.update(body).subscribe();
    }
  }
}
