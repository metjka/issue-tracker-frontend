import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {CreateIssueAction, IIssue, IssueStatus, LoadAllAction, UpdateIssueAction} from './state/issue.actions';
import {selectFeatureCount} from './state/issue.reducer';
import {Observable} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {UpdateIssueDialog} from './create-issue-dialog/update-issue-dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private issues$: Observable<IIssue[]>;

  constructor(private store: Store<any>,
              public dialog: MatDialog) {
    this.issues$ = this.store.select(selectFeatureCount);
  }

  ngOnInit(): void {
    this.store.dispatch(LoadAllAction());
  }

  public edit(issue: IIssue): void {
    const matDialogRef = this.dialog.open(UpdateIssueDialog, {data: issue});
    matDialogRef.afterClosed().subscribe(changes => {
      if (changes) {
        this.store.dispatch(UpdateIssueAction({
          issueId: issue._id,
          changes: changes
        }));
      }
    });
  }

  public changeStatus(prop: {issueId: string, newStatus: IssueStatus}): void {
    this.store.dispatch(UpdateIssueAction({issueId: prop.issueId, changes: {status: prop.newStatus}}));
  }

  public createNew(): void {
    const matDialogRef = this.dialog.open(UpdateIssueDialog, {});
    matDialogRef.afterClosed().subscribe(issue => {
      if (issue) {
        this.store.dispatch(CreateIssueAction({issue: issue}));
      }
    });
  }
}
