import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CriteriaRowComponent } from '../criteria-row/criteria-row.component';
import { NgForOf } from '@angular/common';
import {ResizableDirective} from "../resizable";
import {Criteria} from "../models/Criteria";
import {HttpClient} from "@angular/common/http";
import {FilterService} from "../services/filter.service";

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

  constructor(private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<FilterDialogComponent>,
              private http: HttpClient,
              private filterService: FilterService) {
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
  onSaveButtonClick() {
    const filterName = this.form.value.filterName;
    const criterias: Criteria[] = this.criteria.map(crit => {
      return {
        type: crit.value.criteriaType,
        comparator: crit.value.criteriaCondition,
        metric: crit.value.criteriaMetric
      };
    });
    const filterDto = {
      filterName: filterName,
      criterias: criterias
    };

    this.filterService.createNewFilter(filterDto);
  }


}
