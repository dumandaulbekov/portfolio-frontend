import { NgModule } from '@angular/core';
import { NgModel } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CreatePostComponent } from './post/create-post/create-post.component';
import { UpdatePostComponent } from './post/update-post/update-post.component';

const routes: Routes = [
    { path: 'create-post', component: CreatePostComponent },
    { path: 'update-post', component: UpdatePostComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AdminRoutingModule { }

