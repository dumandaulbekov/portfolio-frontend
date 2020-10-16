import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatePostComponent } from './post/create-post/create-post.component';
import { UpdatePostComponent } from './post/update-post/update-post.component';
import { AdminRoutingModule } from './admin-routing.module';
import { MaterialModule } from '../_shared/modules/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [CreatePostComponent, UpdatePostComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
