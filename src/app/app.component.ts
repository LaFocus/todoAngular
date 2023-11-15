import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'todolist';
  ngOnInit() {
    !localStorage.getItem('notes') ? localStorage.setItem('notes', '[]') : '' 
  }
}
