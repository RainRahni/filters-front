import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {HttpErrorResponse} from "@angular/common/http";
import {Filter} from "../models/Filter";
import {FilterService} from "../services/filter.service";
import {FilterDialogComponent} from "../filter-dialog/filter-dialog.component";
import { MatDialog } from '@angular/material/dialog';
import {OverlayConfig} from "@angular/cdk/overlay";


@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    FilterDialogComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {
  public filters: Filter[] | undefined;
  public selectedFilter: Filter | undefined;
  public isDialogModal = true;
  constructor(private filterService: FilterService, public dialog: MatDialog) { }
  ngOnInit() {
    this.getCreatedFilters();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(FilterDialogComponent, {
      width: '1000px',
      height: '500px',
      maxHeight: '500px',
      hasBackdrop: this.isDialogModal,
      panelClass: "custom"
    });
  }
  public getCreatedFilters(): void {
    this.filterService.getCreatedFilters().subscribe(
      (response: Filter[]) => {
        this.filters = response;
        console.log(this.filters);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  title = 'filters-front';
}
