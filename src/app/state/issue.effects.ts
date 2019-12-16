import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {
  CreateIssueAction, CreateIssueFailureAction, CreateIssueSuccessAction,
  IIssue,
  LoadAllAction,
  LoadAllFailureAction,
  LoadAllSuccessAction,
  UpdateIssueAction, UpdateIssueFailureAction,
  UpdateIssueSuccessAction
} from './issue.actions';
import {IssueService} from './issue.service';

@Injectable()
export class IssueEffects {

  @Effect()
  loadIssues$ = this.actions$.pipe(
    ofType(LoadAllAction),
    switchMap(() => this.issueService.getAll()),
    map(issues => LoadAllSuccessAction({issues})),
    catchError((err) => of(LoadAllFailureAction({error: err})))
  );

  @Effect()
  updateIssue$ = this.actions$.pipe(
    ofType(UpdateIssueAction),
    switchMap(action => this.issueService.update(action.issueId, action.changes)),
    map((issue: IIssue) => UpdateIssueSuccessAction({issue})),
    catchError((err) => of(UpdateIssueFailureAction({error: err})))
  );
  @Effect()
  createIssue$ = this.actions$.pipe(
    ofType(CreateIssueAction),
    switchMap(action => this.issueService.create( action.issue)),
    map((issue: IIssue) => CreateIssueSuccessAction({issue})),
    catchError((err) => of(CreateIssueFailureAction({error: err})))
  );

  constructor(
    private actions$: Actions,
    private issueService: IssueService
  ) {
  }
}
