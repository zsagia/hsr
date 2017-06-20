import { Route } from '@angular/router';
import { ChatComponent } from '../components/chat/chat.component';
import { FotosComponent } from '../components/fotos/fotos.component';
import { HomeComponent } from '../components/home/home.component';
import { LinkAccountComponent } from '../components/link-account/link-account.component';
import { LoginComponent } from '../components/login/login.component';
import { ManualsComponent } from '../components/manuals/manuals.component';
import { PlattenDetailsComponent } from '../components/platten/platten-details/platten-details.component';
import { PlattenComponent } from '../components/platten/platten.component';
import { RegisterComponent } from '../components/register/register.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { HsrAuthService } from '../services/firebase-auth.service';

export interface MyRoute extends Route {
  text?: string;
  icon?: string;
}

export const ROUTES_CONFIG: MyRoute[] = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'blog', loadChildren: './blog/blog.module#BlogModule', text: 'Blog', icon: 'newspaper-o', canActivate: [HsrAuthService]},
  {path: 'fotos', component: FotosComponent, text: 'Fotos', icon: 'camera-retro', canActivate: [HsrAuthService]},
  {path: 'chat', component: ChatComponent, text: 'Chat', icon: 'comments', canActivate: [HsrAuthService]},
  {path: 'manual', component: ManualsComponent, text: 'Handbücher', icon: 'book', canActivate: [HsrAuthService]},
  {
    path: 'platten',
    component: PlattenComponent,
    text: 'Platten',
    icon: 'headphones',
    canActivate: [HsrAuthService]
  },
  {path: 'platten/:key', component: PlattenDetailsComponent, canActivate: [HsrAuthService]},
  {path: 'link-account', component: LinkAccountComponent, canActivate: [HsrAuthService]},
  {path: '**', component: PageNotFoundComponent}
];
