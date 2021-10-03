import {Component, DebugElement, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  template: 
  `
    <h3 mat-dialog-title>Add Challenge </h3>
        
        <div>
            <mat-form-field appearance="standard">
                <mat-label>Title* </mat-label>
                <input #title matInput>   
            </mat-form-field>
            <mat-error *ngIf="submitted && !title.value">title is required</mat-error>
        </div>
        <div>
            <mat-form-field appearance="standard">
                <mat-label>Description* </mat-label>
                <input #desc matInput>
            </mat-form-field>
            <mat-error *ngIf="submitted && !desc.value">Description is required</mat-error>
        </div>
       
        <div>
            <mat-form-field class="example-chip-list" appearance="standard">
            <mat-label>Tags</mat-label>
            <mat-chip-list #chipList aria-label="tags selection">
                <mat-chip *ngFor="let tag of tags" [selectable]="selectable"
                        [removable]="removable" (removed)="remove(tag)">
                    {{tag.name}}
                    <mat-icon matChipRemove *ngIf="removable">cancel</mat-icon>
                </mat-chip>
                <input [matChipInputFor]="chipList" [matChipInputSeparatorKeyCodes]="separatorKeysCodes" 
                    [matChipInputAddOnBlur]="addOnBlur" (matChipInputTokenEnd)="add($event)">
            </mat-chip-list>
            </mat-form-field>
        </div>
        <button style="margin-right:8px;" mat-raised-button (click)="apply(title.value, desc.value)">
            Submit
        </button>

        <button mat-raised-button (click)="close()">
            close
        </button>
       
   
  `
})
export class AddChallengeComponent {
    visible = true;
    selectable = true;
    removable = true;
    addOnBlur = true;
    submitted = false;
    readonly separatorKeysCodes: number[] = [ENTER, COMMA];
    tags = [];
    employeeId:number

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<AddChallengeComponent>) {
        this.dialogRef.disableClose = true;
        this.employeeId = JSON.parse(localStorage.getItem('employeeId'))
    }


    apply(title, desc) {
        
        if(!title || !desc){
            this.submitted = true
            return
        }

        let time = new Date().getTime()

        let data = {title,desc, tags:this.tags, time:time, createdBy:this.employeeId, upvoteBy:[]}
        this.dialogRef.close(data);
    }

    close() {
        this.dialogRef.close(false);
    }

    add(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;

        if ((value || '').trim()) {
            this.tags.push({name: value.trim()});
        }

        if (input) {
        input.value = '';
        }
    }

    remove(tags): void {
        const index = this.tags.indexOf(tags);

        if (index >= 0) {
        this.tags.splice(index, 1);
        }
    }

}
