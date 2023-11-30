import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-editNote',
  templateUrl: './editNote.component.html',
  styleUrls: ['./editNote.component.scss'],
})
export class editNoteComponent {
  modal: boolean = true;
  storage: any = localStorage;
  noteName: string = '';
  noteValue: string = '';

  @Input() currItemIndex: string | number | any = ''
  @Input() addBtn: boolean = true
  @Output() modalChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() noteEdited = new EventEmitter<void>();

  addNote(name: any, value: any) {
    let notes: {
      name: string;
      value: string;
    }[] = JSON.parse(this.storage.getItem('notes')) || [];
    let noteObject: {
      name: string;
      value: string;
      date: string;
    } = {
      name: name,
      value: value,
      date: `${new Date().getFullYear()}.${new Date().getMonth()}.${new Date().getDate()}`,
    };
    notes.push(noteObject);
    this.storage.setItem('notes', JSON.stringify(notes));
    this.noteName = ''
    this.noteValue = ''
    this.noteEdited.emit()
  }
  editNote(i: number, name: string, value: string) {
    let notes: {
      name: string;
      value: string;
    }[] = JSON.parse(this.storage.getItem('notes')) || [];
    notes[i].name = name
    notes[i].value = value
    this.storage.setItem('notes', JSON.stringify(notes));
    console.log(i, name, value);
    this.noteEdited.emit()
  }
  closeModal() {
    this.modal = false;
  }
  onModalChanged() {
    this.modalChanged.emit(this.modal);
  }
}
