import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {IssueListComponent} from './issue-list/issue-list.component';
import {StoreModule} from '@ngrx/store';
import {issuesReducer, logger} from './state/issue.reducer';
import {EffectsModule} from '@ngrx/effects';
import {IssueEffects} from './state/issue.effects';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {UpdateIssueDialog} from './create-issue-dialog/update-issue-dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatIconModule} from '@angular/material/icon';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    IssueListComponent,
    UpdateIssueDialog
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    // @ts-ignore
    StoreModule.forRoot({issues: issuesReducer}, {metaReducers: [logger]}),
    EffectsModule.forRoot([IssueEffects]),
    BrowserAnimationsModule,
    FormsModule,
    CommonModule,
    MatIconModule,
    MatSortModule,
    MatTableModule,
    MatInputModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ],
  entryComponents: [
    UpdateIssueDialog
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
