import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { Reservation } from '../../../models/reservation.model';
import { ReservationService } from '../../../services/reservation.service';

@Component({
  selector: 'app-reservation-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit {
  reservations$: Observable<Reservation[]>;

  constructor(private reservationService: ReservationService) {
    this.reservations$ = this.reservationService.getReservations();
  }

  ngOnInit(): void {}

  approveReservation(id: number) {
    this.reservationService.updateReservationStatus(id, 'APPROVED').subscribe();
  }

  cancelReservation(id: number) {
    this.reservationService.updateReservationStatus(id, 'CANCELLED').subscribe();
  }
}
