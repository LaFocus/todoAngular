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
  @Output() noteDeleted = new EventEmitter<void>();

  storage: any = localStorage;

  deleteNote() {
    let notes: {
      name: string;
      value: string;
      isVisible: boolean; 
    }[] = JSON.parse(this.storage.getItem('notes')) || [];

    notes.splice(this.i, 1);
    this.storage.setItem('notes', JSON.stringify(notes));
    this.noteDeleted.emit();
  }

  editNote() {
    let notes: {
      name: string;
      value: string;
      isVisible: boolean;
    }[] = JSON.parse(this.storage.getItem('notes'));
    this.emitIndex.emit(this.i);
  }
}
