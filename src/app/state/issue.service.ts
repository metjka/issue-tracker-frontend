import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IIssue} from './issue.actions';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  private apiUrl = 'http://localhost:3003/api';

  constructor(protected http: HttpClient) {
  }

  public getAll(): Observable<IIssue[]> {
    return this.http.get<IIssue[]>(`${this.apiUrl}/issues`);
  }

  public getById(id: string): Observable<IIssue> {
    return this.http.get<IIssue>(`${this.apiUrl}/issues/${id}`);
  }

  public update(id: string, changes: Partial<IIssue>): Observable<IIssue> {
    return this.http.put<IIssue>(`${this.apiUrl}/issues/${id}`, changes);
  }

  public delete(id: string): Observable<IIssue> {
    return this.http.delete<IIssue>(`${this.apiUrl}/issues/${id}`);
  }

  public create(issue: IIssue): Observable<IIssue> {
    return this.http.post<IIssue>(`${this.apiUrl}/issues`, issue);
  }
}
