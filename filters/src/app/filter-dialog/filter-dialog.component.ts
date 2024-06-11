import {ChangeDetectorRef, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {CriteriaRowComponent} from '../criteria-row/criteria-row.component';
import {NgForOf} from '@angular/common';
import {Criteria} from "../models/Criteria";
import {FilterService} from "../services/filter.service";
import {catchError} from "rxjs";
import {environment} from "../environments/environment";

@Component({
  selector: 'app-filter-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CriteriaRowComponent,
    NgForOf,
  ],
  templateUrl: './filter-dialog.component.html',
  styleUrls: ['./filter-dialog.component.css']
})
export class FilterDialogComponent implements OnInit {
  form: FormGroup;
  @Output() dialogTypeChange = new EventEmitter<string>();

  constructor(private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<FilterDialogComponent>,
              private filterService: FilterService,
              private cdr: ChangeDetectorRef) {
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

  onDialogTypeChange(dialogType: string) {
    this.dialogTypeChange.emit(dialogType);
    localStorage.setItem('dialogType', dialogType);
  }

  ngOnInit(): void {
    const dialogType = localStorage.getItem('dialogType') ?? 'modal';
    this.form.patchValue({ dialogType });
    this.cdr.detectChanges();
  }
  addRow() {
    (this.form.get('criteria') as FormArray).push(this.createCriteriaForm());
  }

  removeRow(index: number) {
    (this.form.get('criteria') as FormArray).removeAt(index);
  }
  private createCriteriaForm(): FormGroup {
    return this.formBuilder.group({
      criteriaType: environment.defaultCriterionType,
      criteriaCondition: '',
      criteriaMetric: '',
      day: '',
      month: '',
      year: ''
    });
  }

  onSaveButtonClick() {
    const filterName = this.form.value.filterName;
    const criteria: Criteria[] = this.form.value.criteria.map((crit: any) => {
      let metric;
      if (crit.criteriaType === 'Date' && crit.year && crit.month && crit.day) {
        const date = new Date(crit.year, crit.month - 1, crit.day);
        metric = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`;
        // 'YYYY-MM-DD'
      } else {
        metric = crit.criteriaMetric;
      }
      return {
        type: crit.criteriaType.toUpperCase(),
        condition: crit.criteriaCondition,
        metric: metric
      };
    });
    if (criteria.length < environment.minRequiredCriteria) {
      alert(environment.notEnoughCriteriaMessage);
      return;
    }
    const filterDto = {
      name: filterName,
      criteria: criteria
    };
    this.filterService.createNewFilter(filterDto).pipe(
      catchError(error => {
        alert(error["error"]);
        throw error;
      })
    ).subscribe(response => {
      this.dialogRef.close()
    });
  }
}
