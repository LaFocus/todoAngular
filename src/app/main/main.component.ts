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
  currItemIndex: number = 0
  addBtn: boolean = true
  grid: string = '1fr 1fr 1fr'

  onModalChanged(value: boolean) {
    this.modal = value;
    console.log(this.modal);
  }
  openModal() {
    this.modal = true;
    this.addBtn = true
  }
  onItemClicked(value: any) {
    this.currItemIndex = value
    this.modal = true
    this.addBtn = false
    console.log(this.currItemIndex); 
  }
  changeView() {
    this.grid === '1fr' ? this.grid = '1fr 1fr 1fr' : this.grid = '1fr'
  }
}