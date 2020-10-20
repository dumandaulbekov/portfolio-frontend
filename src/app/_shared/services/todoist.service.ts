import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ITodoChangeBoardType, ITodoChangeName, ITodoFinished, ITodoist } from '../models/todoist.model';

@Injectable({ providedIn: 'root' })

export class TodoistService {

    constructor(
        private http: HttpClient
    ) { }

    public getAll(): Observable<ITodoist[]> {
        return this.http.get<ITodoist[]>(`${environment.PHP_TODOIST_API}/getAll.php`);
    }

    public create(body: ITodoist): Observable<ITodoist> {
        return this.http.post<ITodoist>(`${environment.PHP_TODOIST_API}/create.php`, body);
    }

    public finished(body: ITodoFinished[]): Observable<ITodoFinished[]> {
        return this.http.put<ITodoFinished[]>(`${environment.PHP_TODOIST_API}/finished.php`, body);
    }

    public editName(body: ITodoChangeName): Observable<ITodoChangeName> {
        return this.http.put<ITodoChangeName>(`${environment.PHP_TODOIST_API}/updateTodo.php`, body);
    }

    public editBoardType(body: ITodoChangeBoardType): Observable<ITodoChangeBoardType> {
        return this.http.put<ITodoChangeBoardType>(`${environment.PHP_TODOIST_API}/updateBoardType.php`, body);
    }

    public getById(): Observable<ITodoist> {
        return this.http.get<ITodoist>(`${environment.PHP_TODOIST_API}/getById.php`);
    }

    public delete(id: number): Observable<void> {
        return this.http.delete<void>(`${environment.PHP_TODOIST_API}/delete.php/?id=${id}`);
    }

}
