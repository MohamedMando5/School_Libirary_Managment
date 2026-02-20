export interface Reservation {
  id: number;
  bookId: number;
  userId: number;
  reservationDate: Date;
  status: 'PENDING' | 'APPROVED' | 'ACTIVE' | 'FULFILLED' | 'CANCELLED';
}
