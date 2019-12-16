import {createAction, props} from '@ngrx/store';

export enum IssueStatus {
  OPEN = 'OPEN',
  PENDING = 'PENDING',
  CLOSED = 'CLOSED'
}

export interface IIssue {
  _id: string;
  title: string;
  description: string;
  status: IssueStatus;
  createdAt: Date;
  updatedAt: Date;
}

export const LoadAllAction = createAction('[Issues] Load all');
export const LoadAllSuccessAction = createAction(
  '[Issues] Load all success',
  props<{issues: IIssue[]}>()
);
export const LoadAllFailureAction = createAction('[Issues] Load all failure',
  props<{error: Error}>()
);

export const CreateIssueAction = createAction('[Issues] Create issue',
  props<{issue: IIssue}>());

export const CreateIssueSuccessAction = createAction(
  '[Issues] Create issue success',
  props<{issue: IIssue}>()
);
export const CreateIssueFailureAction = createAction('[Issues] Create issue failure',
  props<{error: Error}>()
);

export const UpdateIssueAction = createAction('[Issues] Update issue',
  props<{issueId: string, changes: Partial<IIssue>}>()
);
export const UpdateIssueSuccessAction = createAction(
  '[Issues] Update issue success',
  props<{issue: IIssue}>()
);
export const UpdateIssueFailureAction = createAction('[Issues] Update issue failure',
  props<{error: Error}>()
);
