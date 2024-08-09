import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<nav></nav><router-outlet></router-outlet>',
  styleUrl: './app.component.css',
})
export class AppComponent {
    title = 'TODOLIST';
}
