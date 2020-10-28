import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ITodoChangeBoardType, ITodoChangeName, ITodoist } from '../models/todoist.model';

@Injectable({ providedIn: 'root' })
export class TodoistService {

    constructor(
        private http: HttpClient
    ) { }

    public getAll(): Observable<ITodoist[]> {
        return this.http.get<ITodoist[]>(`${environment.PHP_TODO_API}/getAll.php`);
    }

    public getById(id: number): Observable<ITodoist> {
        return this.http.get<ITodoist>(`${environment.PHP_TODO_API}/getById.php?id=${id}`);
    }

    public create(body: ITodoist): Observable<ITodoist> {
        return this.http.post<ITodoist>(`${environment.PHP_TODO_API}/create.php`, body);
    }

    public editName(body: ITodoChangeName): Observable<ITodoChangeName> {
        return this.http.put<ITodoChangeName>(`${environment.PHP_TODO_API}/updateTodo.php`, body);
    }

    public editBoardType(body: ITodoChangeBoardType): Observable<ITodoChangeBoardType> {
        return this.http.put<ITodoChangeBoardType>(`${environment.PHP_TODO_API}/updateBoardType.php`, body);
    }

    public delete(id: number): Observable<ITodoist> {
        return this.http.put<ITodoist>(`${environment.PHP_TODO_API}/delete.php`, id);
    }

}
