import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {SidebarComponent} from './sidebar/sidebar.component';
import {TeamRecapComponent} from "./team-recap/team-recap.component";
import {HeaderComponent} from "./header/header.component";

@Component({
  selector: 'app-root',
  imports: [SidebarComponent, TeamRecapComponent, HeaderComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'exam';
}
