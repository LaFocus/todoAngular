import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  searchActivated: boolean = false;
  @Output() emitSearch = new EventEmitter<string>();
  searchInput: string = '';
  navbar: string[] = [
    'Home',
    'About',
    'Contacts',
    'Reviews'
  ]

  openSearchMode() {
    this.searchActivated = true;
  }
  onEmitSearch() {
    this.emitSearch.emit(this.searchInput);
  }
  logSearchElement(data: HTMLInputElement) {
    console.log(data.value);
  }
}
