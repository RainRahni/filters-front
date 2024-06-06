import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-criteria-row',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './criteria-row.component.html',
  styleUrl: './criteria-row.component.css'
})
export class CriteriaRowComponent implements OnInit {
  criteriaForm: FormGroup = this.formBuilder.group({
    criteriaType: 'Amount',
    criteriaCondition: 'From',
    criteriaMetric: '',
    day: '',
    month: '',
    year: ''
  });
  days: number[] = Array(31).fill(0).map((x,i)=>i+1);
  months: number[] = Array(12).fill(0).map((x,i)=>i+1);
  years: number[] = Array.from({length: 100}, (_, i) => new Date().getFullYear() - i);
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    // Additional initialization if needed
  }
}
