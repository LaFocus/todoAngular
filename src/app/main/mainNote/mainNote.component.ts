import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-mainNote',
  templateUrl: './mainNote.component.html',
  styleUrls: ['./mainNote.component.scss'],
})
export class MainNoteComponent {
  @Input() note: any;
  @Input() i: any;
  @Output() emitIndex = new EventEmitter<any>();

  storage: any = localStorage;

  deleteNote() {
    let notes: {
      name: string;
      value: string;
    }[] = JSON.parse(this.storage.getItem('notes')) || [];
    notes.splice(this.i, 1);
    this.storage.setItem('notes', JSON.stringify(notes));
  }
  editNote() {
    let notes: {
      name: string;
      value: string;
    }[] = JSON.parse(this.storage.getItem('notes'));
    const currNote: {} = notes[this.i];
    this.emitIndex.emit(this.i);
  }
}
