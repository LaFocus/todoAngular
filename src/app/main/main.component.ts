import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  storage: any = localStorage;
  notesArr: any[] = JSON.parse(this.storage.getItem('notes'));
  modal: boolean | any;
  onModalChanged(value: boolean) {
    this.modal = value;
    console.log(this.modal);
  }
  openModal() {
    this.modal = true;
  }
}
