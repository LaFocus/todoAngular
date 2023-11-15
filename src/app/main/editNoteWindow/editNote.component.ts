import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-editNote',
  templateUrl: './editNote.component.html',
  styleUrls: ['./editNote.component.scss'],
})
export class editNoteComponent {
  modal: boolean = true;

  @Output() modalChanged: EventEmitter<boolean> = new EventEmitter<boolean>()

  closeModal() {
    this.modal = false;
  }
  onModalChanged() {
    this.modalChanged.emit(this.modal)
  }
}
