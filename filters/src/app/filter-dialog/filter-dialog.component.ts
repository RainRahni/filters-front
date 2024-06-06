import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-filter-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './filter-dialog.component.html',
  styleUrl: './filter-dialog.component.css'
})
export class FilterDialogComponent implements OnInit {
  filterForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.filterForm = this.formBuilder.group({
      filterName: '',
    });
  }

  onSubmit(): void {
    if (this.filterForm) {
      // Handle form submission
      console.log(this.filterForm.value);
    }
  }
}
