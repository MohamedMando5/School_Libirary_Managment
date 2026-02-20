import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Reservation } from '../models/reservation.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private reservations: Reservation[] = [];
  private reservationsSubject = new BehaviorSubject<Reservation[]>(this.reservations);

  constructor() { }

  getReservations(): Observable<Reservation[]> {
    return this.reservationsSubject.asObservable();
  }

  addReservation(reservation: Reservation): Observable<void> {
    reservation.id = this.reservations.length > 0 ? Math.max(...this.reservations.map(r => r.id)) + 1 : 1;
    reservation.reservationDate = new Date();
    reservation.status = 'ACTIVE';
    this.reservations.push(reservation);
    this.reservationsSubject.next(this.reservations);
    return of(void 0);
  }

  getUserReservations(userId: number): Observable<Reservation[]> {
    return of(this.reservations.filter(r => r.userId === userId));
  }

  updateReservationStatus(id: number, status: 'PENDING' | 'APPROVED' | 'ACTIVE' | 'FULFILLED' | 'CANCELLED'): Observable<boolean> {
    const res = this.reservations.find(r => r.id === id);
    if (res) {
      res.status = status;
      this.reservationsSubject.next(this.reservations);
      return of(true);
    }
    return of(false);
  }
}
