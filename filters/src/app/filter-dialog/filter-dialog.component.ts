import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {CriteriaRowComponent} from "../criteria-row/criteria-row.component";

@Component({
  selector: 'app-filter-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CriteriaRowComponent
  ],
  templateUrl: './filter-dialog.component.html',
  styleUrl: './filter-dialog.component.css'
})
export class FilterDialogComponent implements OnInit {

  filterForm: FormGroup = this.formBuilder.group({
    filterName: '',
    filterForm: this.formBuilder.array([])
  });

  constructor(private formBuilder: FormBuilder) {}

  createRow(): FormGroup {
    return this.formBuilder.group({
      criteriaType: 'AMOUNT',
      criteriaCondition: 'More',
      criteriaMetric: ''
    });
  }

  addRow() {
    const control = <FormArray>this.filterForm.controls['filterForm'];
    control.push(this.createRow());
  }

  ngOnInit(): void {
    this.addRow(); // Add initial row
    console.log(this.filterForm.value);
  }

  onSubmit(): void {
    if (this.filterForm) {
      console.log(this.filterForm.value);
    }
  }
}
