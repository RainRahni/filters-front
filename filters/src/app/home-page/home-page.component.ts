import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {HttpErrorResponse} from "@angular/common/http";
import {Filter} from "../models/Filter";
import {FilterService} from "../services/filter.service";


@Component({
  selector: 'app-home-page',
  standalone: true,
    imports: [
        NgForOf,
        NgIf
    ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {
  public filters: Filter[] | undefined;
  public selectedFilter: Filter | undefined;
  constructor(private filterService: FilterService) { }
  ngOnInit() {
    this.getCreatedFilters();
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
