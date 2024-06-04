import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";


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
export class HomePageComponent {

}
