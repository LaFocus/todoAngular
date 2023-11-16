import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'todolist';
  searchInput: string = '';
  ngOnInit() {
    !localStorage.getItem('notes') ? localStorage.setItem('notes', '[]') : '';
  }
  onSearchEmitted(value: string) {
    this.searchInput = value;
  }
}
