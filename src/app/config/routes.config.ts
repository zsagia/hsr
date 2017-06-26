import { Route } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { LoginComponent } from '../components/login/login.component';
import { PageNotFoundComponent } from '../components/page-not-found/page-not-found.component';
import { PlattenDetailsComponent } from '../components/platten/platten-details/platten-details.component';
import { PlattenComponent } from '../components/platten/platten.component';
import { RegisterComponent } from '../components/register/register.component';
import { HsrAuthService } from '../shared/services/firebase-auth.service';

export interface MyRoute extends Route {
  text?: string;
  icon?: string;
}

export const ROUTES_CONFIG: MyRoute[] = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'blog', loadChildren: './modules/blog/blog.module#BlogModule', text: 'Blog', icon: 'newspaper-o', canActivate: [HsrAuthService]},
  {path: 'fotos', loadChildren: './modules/fotos/fotos.module#FotosModule', text: 'Fotos', icon: 'camera-retro', canActivate: [HsrAuthService]},
  {path: 'chat', loadChildren: './modules/chat/chat.module#ChatModule', text: 'Chat', icon: 'comments', canActivate: [HsrAuthService]},
  {path: 'manual', loadChildren: './modules/manuals/manuals.module#ManualsModule', text: 'Handbücher', icon: 'book', canActivate: [HsrAuthService]},
  {path: 'platten', component: PlattenComponent, text: 'Platten', icon: 'headphones', canActivate: [HsrAuthService]},
  {path: 'platten/:key', component: PlattenDetailsComponent, canActivate: [HsrAuthService]},
  {path: '**', component: PageNotFoundComponent}
];
