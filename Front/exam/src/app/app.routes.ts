import { Routes } from '@angular/router';
import { AddplayerComponent } from './addplayer/addplayer.component';
import { AddteamComponent } from './addteam/addteam.component';
import { TeamRecapComponent } from './team-recap/team-recap.component';
import {WelcomeComponent} from './home/home.component';
import {TeamsComponent} from './teams/teams.component';
import {PlayersComponent} from './players/players.component';
import {MatchesComponent} from './matches/matches.component';
import {RankingsComponent} from './rankings/rankings.component';
import {NewsComponent} from './news/news.component';
import {DeleteplayerComponent} from './deleteplayer/deleteplayer.component';
import {DeleteteamComponent} from './deleteteam/deleteteam.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirection par défaut
  { path: 'add-player', component: AddplayerComponent }, // Route pour ajouter un joueur
  { path: 'add-team', component: AddteamComponent }, // Route pour ajouter une équipe
  { path: 'delete-player', component: DeleteplayerComponent },
  { path: 'delete-team', component: DeleteteamComponent },
  { path: 'teams', component: TeamsComponent },
  { path: 'players', component: PlayersComponent },
  { path: 'matches', component: MatchesComponent },
  { path: 'rankings', component: RankingsComponent },
  { path: 'news', component: NewsComponent },
  { path: 'recap', component: TeamRecapComponent }, // Route pour le récapitulatif
  { path: 'home', component: WelcomeComponent }, // Page d'accueil
  { path: '**', redirectTo: '/home' }, // Redirection pour les routes non trouvées
];
