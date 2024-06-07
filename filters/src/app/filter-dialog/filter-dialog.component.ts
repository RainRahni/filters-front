import {Component, EventEmitter, OnInit, Output, ViewChild, ViewContainerRef} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CriteriaRowComponent } from '../criteria-row/criteria-row.component';
import {NgForOf} from "@angular/common";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-filter-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CriteriaRowComponent,
    NgForOf
  ],
  templateUrl: './filter-dialog.component.html',
  styleUrls: ['./filter-dialog.component.css']
})
export class FilterDialogComponent implements OnInit {

  criteria: FormGroup[] = [];
  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<FilterDialogComponent>) { }
  @Output() closeDialog = new EventEmitter<void>();

  onCloseButtonClick() {
    this.dialogRef.close();
  }
  ngOnInit(): void { }

  addRow() {
    this.criteria.push(this.createCriteriaForm());
  }

  removeRow(index: number) {
    this.criteria.splice(index, 1);
  }

  private createCriteriaForm() {
    return this.formBuilder.group({
      criteriaType: 'Amount',
      criteriaCondition: 'From',
      criteriaMetric: '',
      day: '',
      month: '',
      year: ''
    });
  }
}
