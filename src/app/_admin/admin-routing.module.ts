import { NgModule } from '@angular/core';
import { NgModel } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { PostComponent } from '../posts/post/post.component';
import { CreatePostComponent } from './post/create-post/create-post.component';
import { DashboardComponent } from './post/dashboard/dashboard.component';
import { UpdatePostComponent } from './post/update-post/update-post.component';

const routes: Routes = [
    { path: '', redirectTo: 'post-dashboard', pathMatch: 'full' },
    { path: 'post-dashboard', component: DashboardComponent },
    { path: 'create-post', component: CreatePostComponent },
    { path: 'update-post/:id', component: UpdatePostComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AdminRoutingModule { }

