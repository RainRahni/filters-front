import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CriteriaRowComponent } from '../criteria-row/criteria-row.component';

@Component({
  selector: 'app-filter-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CriteriaRowComponent
  ],
  templateUrl: './filter-dialog.component.html',
  styleUrls: ['./filter-dialog.component.css']
})
export class FilterDialogComponent implements OnInit {
  @ViewChild('rowContainer', { read: ViewContainerRef }) container!: ViewContainerRef;

  constructor() { }

  addRow() {
    this.container.createComponent(CriteriaRowComponent);
  }

  ngOnInit(): void { }
}
