import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AddplayerComponent} from './addplayer/addplayer.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {AddteamComponent} from "./addteam/addteam.component";

@Component({
  selector: 'app-root',
  imports: [AddteamComponent, SidebarComponent, AddplayerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'exam';
}
