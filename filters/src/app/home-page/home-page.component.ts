import {AfterViewInit, Component, OnInit} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FilterDialogComponent } from '../filter-dialog/filter-dialog.component';
import { FilterService } from '../services/filter.service';
import { Filter } from '../models/Filter';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
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
      maxHeight: '500px',
      hasBackdrop: this.isDialogModal,
      disableClose: this.isDialogModal,
      position: dialogType === 'nonmodal' ? { bottom: '0px' } : undefined,
      panelClass: "custom",
    });
    this.dialogRef.afterOpened().subscribe(() => {
      $('.mat-dialog-container').resizable({
        minHeight: 300,
        minWidth: 300
      });
    });
    if (this.dialogTypeChangeSubscription) {
      this.dialogTypeChangeSubscription.unsubscribe();
    }

    this.dialogTypeChangeSubscription = this.dialogRef.componentInstance.dialogTypeChange.
    subscribe((dialogType: string) => {
      if (dialogType === 'nonmodal') {
        this.dialogRef.disableClose = false;
        this.isDialogModal = false;
      } else {
        this.dialogRef.disableClose = true;
        this.isDialogModal = true;
      }
    });

    this.dialogRef.afterClosed().subscribe(() => {
      if (this.dialogTypeChangeSubscription) {
        this.dialogRef.disableClose = true;
        this.isDialogModal = true;
        this.dialogTypeChangeSubscription.unsubscribe();
      }
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
}
