import { Component, OnInit } from '@angular/core';
import { MaterialModule } from "../../../shared/material.module";
import { animate, state, style, transition, trigger } from "@angular/animations";
import { IncentivosService } from "../../../core/services/incentivos.service";
import { ResponseIncentivoInterface } from "../../../interfaces/incentivo.interface";

@Component({
  selector: 'app-incentivos',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './incentivos.component.html',
  styleUrl: './incentivos.component.css',
  animations: [
    trigger('slideInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      state('out', style({ transform: 'translateX(-100%)' })),
      transition('in => out', animate('300ms ease-in-out')),
      transition('out => in', animate('300ms ease-in-out'))
    ])
  ]
})
export class IncentivosComponent implements OnInit {
  screen: number;
  incentivos: ResponseIncentivoInterface[];
  moreDetail: ResponseIncentivoInterface | null;

  constructor(private incentivosService: IncentivosService) {
    this.screen = 1
  }

  ngOnInit(): void {
    this.getIncentivos()
  }

  getIncentivos(): void {
    const region = sessionStorage.getItem('region') as string;

    this.incentivosService.getIncentivos(region).subscribe({
      next: (resp) => {
        this.incentivos = resp;
      }
    })
  }

  toggleScreen(data?: ResponseIncentivoInterface | null) {
    this.moreDetail = (data) ? data : null;
    this.screen = this.screen === 1 ? 2 : 1
  }
}
