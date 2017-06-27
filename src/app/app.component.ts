import { Component } from '@angular/core';
import { HsrAuthService } from './shared/services/firebase-auth.service';

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
    {path: 'manual', text: 'Handbücher', icon: 'book'},
    {path: 'platten', text: 'Platten', icon: 'headphones'}
  ];

  constructor(private hsrAuthService: HsrAuthService) {
  }

  get isAuthenticated(): boolean {
    return this.hsrAuthService.isAuthenticated;
  }

  get isAnonymous(): boolean {
    return this.hsrAuthService.isAnonymous;
  }

  get email(): string {
    return this.hsrAuthService.email;
  }

  onLogout() {
    this.hsrAuthService.logout();
  }
}
