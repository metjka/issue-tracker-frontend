import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IIssue, IssueStatus} from '../state/issue.actions';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.scss']
})
export class IssueListComponent {

  @Input() issues: IIssue [] = [];
  @Output() editDialogEmitter = new EventEmitter<IIssue>();
  @Output() editStatusEmitter = new EventEmitter<{issueId: string, newStatus: IssueStatus}>();

  IssueStatus = IssueStatus;

  public openEditDialog(issue: IIssue): void {
    this.editDialogEmitter.emit(issue);
  }

  public statusChange(value: IssueStatus, id: string): void {
    this.editStatusEmitter.emit({issueId: id, newStatus: value});
  }
}
