import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IPost } from '../models/post.model';

@Injectable({ providedIn: 'root' })
export class PostService {

  constructor(
    private http: HttpClient
  ) { }

  public getAll(): Observable<IPost[]> {
    return this.http.get<IPost[]>(`${environment.PHP_POST_API}/getAll.php`);
  }

  public getById(id: number): Observable<IPost> {
    return this.http.get<IPost>(`${environment.PHP_POST_API}/getById.php/?id=${id}`);
  }

  public create(body: IPost): Observable<IPost> {
    return this.http.post<IPost>(`${environment.PHP_POST_API}/create.php`, body);
  }

  public update(body: IPost): Observable<IPost> {
    return this.http.put<IPost>(`${environment.PHP_POST_API}/update.php`, body);
  }

  public delete(id: number): Observable<IPost> {
    return this.http.delete<IPost>(`${environment.PHP_POST_API}/delete.php/?id=${id}`);
  }

}
