import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { MainNoteComponent } from './main/mainNote/mainNote.component';

@NgModule({
  declarations: [
    AppComponent, 
    HeaderComponent, 
    MainComponent,
    MainNoteComponent
  ],
  imports: [
    BrowserModule, 
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
