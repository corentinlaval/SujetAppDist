import { Routes } from '@angular/router';
import { AddplayerComponent } from './addplayer/addplayer.component';
import { AddteamComponent } from './addteam/addteam.component';
import { TeamRecapComponent } from './team-recap/team-recap.component';
import {HomeComponent} from './home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirection par défaut
  { path: 'add-player', component: AddplayerComponent }, // Route pour ajouter un joueur
  { path: 'add-team', component: AddteamComponent }, // Route pour ajouter une équipe
  { path: 'recap', component: TeamRecapComponent }, // Route pour le récapitulatif
  { path: 'home', component: HomeComponent }, // Page d'accueil
  { path: '**', redirectTo: '/home' }, // Redirection pour les routes non trouvées
];
