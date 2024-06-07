import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
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
  @Output() remove = new EventEmitter<void>();
  @Input() criteriaForm!: FormGroup;  // Accept form group as input

  days: number[] = Array(31).fill(0).map((x,i)=>i+1);
  months: number[] = Array(12).fill(0).map((x,i)=>i+1);
  years: number[] = Array.from({length: 100}, (_, i) => new Date().getFullYear() - i);
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
  }
  onRemove() {
    this.remove.emit();
  }

}
