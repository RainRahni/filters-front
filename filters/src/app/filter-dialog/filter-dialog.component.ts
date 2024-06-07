import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CriteriaRowComponent } from '../criteria-row/criteria-row.component';
import { NgForOf } from '@angular/common';
import { ResizableDirective } from "../resizable";
import { Criteria } from "../models/Criteria";
import { HttpClient } from "@angular/common/http";
import { FilterService } from "../services/filter.service";

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

  form: FormGroup;

  @Output() dialogTypeChange = new EventEmitter<string>();

  constructor(private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<FilterDialogComponent>,
              private http: HttpClient,
              private filterService: FilterService) {
    this.form = this.formBuilder.group({
      filterName: [''],
      dialogType: ['modal'],
      criteria: this.formBuilder.array([])
    });
  }

  @Output() closeDialog = new EventEmitter<void>();

  get criteriaControls(): FormGroup[] {
    return (this.form.get('criteria') as FormArray).controls as FormGroup[];
  }

  onCloseButtonClick() {
    this.dialogRef.close();
  }

  onDialogTypeChange() {
    this.dialogTypeChange.emit(this.form.value.dialogType);
  }

  ngOnInit(): void { }

  addRow() {
    (this.form.get('criteria') as FormArray).push(this.createCriteriaForm());
  }

  removeRow(index: number) {
    (this.form.get('criteria') as FormArray).removeAt(index);
  }

  private createCriteriaForm(): FormGroup {
    return this.formBuilder.group({
      criteriaType: 'Amount',
      criteriaCondition: 'More',
      criteriaMetric: '',
      day: '',
      month: '',
      year: ''
    });
  }

  onSaveButtonClick() {
    const filterName = this.form.value.filterName;
    const criterias: Criteria[] = this.form.value.criteria.map((crit: any) => {
      let metric;
      if (crit.criteriaType === 'Date') {
        const date = new Date(crit.year, crit.month - 1, crit.day);
        metric = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`;
        // 'YYYY-MM-DD'
      } else {
        metric = crit.criteriaMetric;
      }
      return {
        type: crit.criteriaType,
        comparator: crit.criteriaCondition,
        metric: metric
      };
    });
    const filterDto = {
      filterName: filterName,
      criterias: criterias
    };
    this.filterService.createNewFilter(filterDto).subscribe(
      response => {
        console.log(response);
        this.dialogRef.close();
      },
      error => {
        console.log(error);
      }
    );
    this.dialogRef.close();
  }

}
