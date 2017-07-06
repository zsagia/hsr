import { Component } from '@angular/core';
import { HsrAuthService } from './shared/services/hsr-auth.service';

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
