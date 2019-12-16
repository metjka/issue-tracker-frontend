import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IIssue} from '../state/issue.actions';

@Component({
  selector: 'app-update-issue',
  templateUrl: './update-issue-dialog.html',
  styleUrls: ['./update-issue-dialog.scss']
})
export class UpdateIssueDialog {
  public issueFormGroup = new FormGroup({
    title: new FormControl('', Validators.compose([
      Validators.required
    ])),
    description: new FormControl('', Validators.compose([
      Validators.required
    ])),
  });

  private issueId: string;

  constructor(
    public dialogRef: MatDialogRef<UpdateIssueDialog>,
    @Inject(MAT_DIALOG_DATA) data: IIssue) {
    if (data) {
      this.issueId = data._id;
      this.issueFormGroup.patchValue(data);
    }
  }

  public onOkClick(): void {
    if (this.issueFormGroup.valid) {
      const issue = {
        title: this.issueFormGroup.value.title,
        description: this.issueFormGroup.value.description,
      } as Partial<IIssue>;
      if (this.issueId) {
        issue._id = this.issueId;
      }
      this.dialogRef.close(issue);
    } else {
      this.issueFormGroup.markAsTouched();
    }
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

}


