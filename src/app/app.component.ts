import { Component, OnDestroy, OnInit } from '@angular/core';
import { HsrAuthService } from './shared/services/hsr-auth.service';
import { HsrPlayerService } from './shared/player/hsr-player.service';
import { Subscription } from 'rxjs/Subscription';
import { HsrDatabaseService } from './shared/services/hsr-database.service';

@Component({
  selector: 'hsr-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  ROUTES = [
    {path: 'blog', text: 'Blog', icon: 'newspaper-o'},
    {path: 'fotos', text: 'Fotos', icon: 'camera-retro'},
    {path: 'chat', text: 'Chat', icon: 'comments'},
    {path: 'files', text: 'Dateien', icon: 'file'},
    {path: 'platten', text: 'Platten', icon: 'headphones'}
  ];

  constructor(public hsrAuthService: HsrAuthService) {
  }
  onLogout() {
    this.hsrAuthService.logout();
  }
}
