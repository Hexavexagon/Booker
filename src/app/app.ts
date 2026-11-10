import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Client } from './client/client';
import { Header } from './header/header';
import { Footer } from './footer/footer';

@Component({
  imports: [
    Client,
    Header,
    Footer,
  ],
  selector: 'app-root',
  styleUrl: './app.less',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('Booker');
}
