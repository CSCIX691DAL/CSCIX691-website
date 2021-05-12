import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private modalOpen = new BehaviorSubject<boolean>(false);
  currentModalState = this.modalOpen.asObservable();

  constructor() { }

  openCloseModal(open: boolean): void {
    this.modalOpen.next(open);
  }
}
