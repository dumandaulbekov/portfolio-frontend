import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ITodoist } from '../models/todoist.model';

@Injectable({ providedIn: 'root' })

export class TodoistService {
    constructor(
        private http: HttpClient
    ) { }

    public create(body: ITodoist): Observable<ITodoist> {
        return this.http.post<ITodoist>(`${environment.PHP_TODOIST_API}/create.php`, body);
    }

}
