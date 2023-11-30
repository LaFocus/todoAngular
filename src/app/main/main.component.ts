import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  storage: any = localStorage;
  notesArr: any[] = [];
  currItemIndex: number = 0;
  modal: boolean | any;
  addBtn: boolean = true;
  grid: boolean = true;

  @Input() searchInput: string = '';

  onModalChanged(value: boolean) {
    this.modal = value;
    console.log(this.modal);
  }

  openModal() {
    this.modal = true;
    this.addBtn = true;
  }

  onItemClicked(value: any) {
    this.currItemIndex = value;
    this.modal = true;
    this.addBtn = false;
    console.log(this.currItemIndex);
  }

  changeView() {
    this.grid = !this.grid;
  }

  onNoteDeleted(): void {
    this.notesArr = this.getUpdatedNotes();
  }
  onNoteEditedorAdded(): void {
    this.notesArr = this.getUpdatedNotes();
    this.modal = false
  }

  private getUpdatedNotes(): any[] {
    return JSON.parse(this.storage.getItem('notes')) || [];
  }

  ngOnInit() {
    this.notesArr = this.getUpdatedNotes();
  }
}
