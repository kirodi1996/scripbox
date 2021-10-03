import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormControl } from '@angular/forms';

@Component({
  template: 
  `
    <h3 mat-dialog-title>Sorting</h3>
        <div>
            <mat-radio-group [formControl]="sorting"  aria-label="Sorting">
                <div style="margin-bottom: 10px;">
                    <mat-radio-button value="1">Creation Date</mat-radio-button>
                </div>
                <div style="margin-bottom: 10px;">    
                    <mat-radio-button value="2">Votes Count</mat-radio-button>
                </div>
                <div >    
                    <mat-radio-button value="0">None</mat-radio-button>
                </div>
            </mat-radio-group>
        </div>
       
        <button style="margin-right:8px" mat-raised-button (click)="apply()">
            Submit
        </button>
        <button mat-raised-button (click)="close()">
            Close
        </button>
        
   
  `
})
export class SortingComponent {
    sorting = new FormControl('')
    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<SortingComponent>) {
        this.dialogRef.disableClose = true;
        this.sorting.setValue(data)
    }
    

    apply() {
        this.dialogRef.close(this.sorting.value)   
    }

    close() {
        this.dialogRef.close(false);
    }

}
