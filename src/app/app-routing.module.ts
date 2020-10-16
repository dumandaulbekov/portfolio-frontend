import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { PostComponent } from './posts/post/post.component';
import { PostsComponent } from './posts/posts.component';

const routes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'posts', component: PostsComponent },
  { path: 'post/:id', component: PostComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
