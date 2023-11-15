import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  storage: any = localStorage;
  notesArr: any[] = JSON.parse(this.storage.getItem('notes'))
  modal: boolean | any;

  addNote(name: any, value: any) {
    let notes: { 
      name: string; 
      value: string;
    }[] =
      JSON.parse(this.storage.getItem('notes')) || [];
    let noteObject: {
      name: string;
      value: string;
      date: string
    } = {
      name: name,
      value: value,
      date: `${new Date().getFullYear()}.${new Date().getMonth()}.${new Date().getDate()}`
    };
    notes.push(noteObject);
    this.storage.setItem('notes', JSON.stringify(notes));
    console.log(this.storage);
  }

  onModalChanged(value: boolean) {
    this.modal = value
    console.log(this.modal);
    
  }
}
