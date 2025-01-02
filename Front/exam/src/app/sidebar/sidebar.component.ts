import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  isCollapsed = false; // État de la sidebar (ouverte/rétractée)
  openSection: string | null = null; // Section actuellement ouverte

  // Gestion de l'ouverture/fermeture de la sidebar
  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  // Gestion de l'ouverture/fermeture des sections
  toggleSection(section: string): void {
    // Ouvre la section sélectionnée ou la referme si elle est déjà ouverte
    this.openSection = this.openSection === section ? null : section;
  }
}
