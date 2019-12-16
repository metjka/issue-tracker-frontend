import {ActionReducer, createReducer, createSelector, MetaReducer, on, State} from '@ngrx/store';
import {CreateIssueSuccessAction, IIssue, LoadAllSuccessAction, UpdateIssueSuccessAction} from './issue.actions';
import {environment} from '../../environments/environment';

export const initialState = {
  allIssues: []
};

const issueReducer = createReducer(initialState,
  on(LoadAllSuccessAction, (state, action) => {
    return {...state, allIssues: action.issues};
  }),
  on(UpdateIssueSuccessAction, (state, action) => {
    return {
      ...state, allIssues: state.allIssues.map(issue => {
        if (issue._id === action.issue._id) {
          return action.issue;
        }
        return issue;
      })
    };
  }),
  on(CreateIssueSuccessAction, (state, action) => {
    return {...state, allIssues: [action.issue, ...state.allIssues]};
  }),
);

export const selectFeature = (state) => state.issues;

export const selectFeatureCount = createSelector(
  selectFeature,
  (state) => state.allIssues
);

export function issuesReducer(state: any, action: any): {allIssues: IIssue[]} {
  return issueReducer(state, action);
}


export function logger(reducer: ActionReducer<State<any>>): ActionReducer<State<any>> {
  return (state: State<any>, action: any): State<any> => {
    console.log('state', state);
    console.log('action', action);
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<State<any>>[] = !environment.production
  ? [logger]
  : [];
