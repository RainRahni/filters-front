import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FilterDialogComponent} from '../filter-dialog/filter-dialog.component';
import {FilterService} from '../services/filter.service';
import {Filter} from '../models/Filter';
import {HttpErrorResponse} from '@angular/common/http';
import {catchError, Subscription} from 'rxjs';
import {NgForOf, NgIf} from "@angular/common";

declare var $: any;

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    FilterDialogComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  public dialogRef!: MatDialogRef<FilterDialogComponent>;
  public filters: Filter[] | undefined;
  public selectedFilter: Filter | undefined;
  public isDialogModal = true;
  private dialogTypeChangeSubscription!: Subscription;

  constructor(private filterService: FilterService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getCreatedFilters();
  }

  openDialog(): void {
    const dialogType = localStorage.getItem('dialogType') ?? 'modal';
    this.isDialogModal = dialogType === 'modal';
    this.dialogRef = this.dialog.open(FilterDialogComponent, {
      width: '1000px',
      height: '500px',
      hasBackdrop: this.isDialogModal,
      disableClose: this.isDialogModal,
      position: dialogType === 'nonmodal' ? { bottom: '0px' } : undefined,
      panelClass: "custom",
    });
    if (this.dialogTypeChangeSubscription) {
      this.dialogTypeChangeSubscription.unsubscribe();
    }
    this.dialogRef.afterClosed().subscribe(() => {
      if (this.dialogTypeChangeSubscription) {
        this.dialogRef.disableClose = true;
        this.isDialogModal = true;
        this.dialogTypeChangeSubscription.unsubscribe();
      }
    });
  }
  public getCreatedFilters(): void {
    this.filterService.getCreatedFilters().pipe(
      catchError(error => {
        alert("Error: " + error.message);
        throw error;
      })
    ).subscribe(response => {
      this.filters = response;
    })
  }
}
