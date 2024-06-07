import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CriteriaRowComponent } from '../criteria-row/criteria-row.component';
import { NgForOf } from '@angular/common';
import {ResizableDirective} from "../resizable";

@Component({
  selector: 'app-filter-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CriteriaRowComponent,
    NgForOf,
    ResizableDirective,
  ],
  templateUrl: './filter-dialog.component.html',
  styleUrls: ['./filter-dialog.component.css']
})
export class FilterDialogComponent implements OnInit {

  criteria: FormGroup[] = [];
  form: FormGroup;

  @Output() dialogTypeChange = new EventEmitter<string>();

  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<FilterDialogComponent>) {
    this.form = this.formBuilder.group({
      filterName: [''],
      dialogType: ['modal']
    });
  }

  @Output() closeDialog = new EventEmitter<void>();

  onCloseButtonClick() {
    this.dialogRef.close();
  }

  onDialogTypeChange() {
    this.dialogTypeChange.emit(this.form.value.dialogType);
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
      criteriaCondition: 'More',
      criteriaMetric: '',
      day: '',
      month: '',
      year: ''
    });
  }
}
