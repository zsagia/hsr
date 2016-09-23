import { RegisterComponent } from '../components/register/register.component';
import { LoginComponent } from '../components/login/login.component';
import { FirebaseAuthService } from '../services/firebase-auth.service';
import { HomeComponent } from '../components/home/home.component';
import { BlogComponent } from '../components/blog/blog.component';
import { FotosComponent } from '../components/fotos/fotos.component';
import { PlattenComponent } from '../components/platten/platten.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { LinkAccountComponent } from '../components/link-account/link-account.component';
import { PlattenDetailsComponent } from '../components/platten/platten-details/platten-details.component';
import { ManualsComponent } from '../components/manuals/manuals.component';
import { ChatComponent } from '../components/chat/chat.component';

export const ROUTES_CONFIG = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'blog', component: BlogComponent, text: 'Blog', icon: 'newspaper-o', canActivate: [FirebaseAuthService]},
  {path: 'fotos', component: FotosComponent, text: 'Fotos', icon: 'camera-retro', canActivate: [FirebaseAuthService]},
  {path: 'chat', component: ChatComponent, text: 'Chat', icon: 'comments', canActivate: [FirebaseAuthService]},
  {path: 'manual', component: ManualsComponent, text: 'Handbücher', icon: 'book', canActivate: [FirebaseAuthService]},
  {
    path: 'platten',
    component: PlattenComponent,
    text: 'Platten',
    icon: 'headphones',
    canActivate: [FirebaseAuthService]
  },
  {path: 'platten/:key', component: PlattenDetailsComponent, canActivate: [FirebaseAuthService]},
  {path: 'link-account', component: LinkAccountComponent, canActivate: [FirebaseAuthService]},
  {path: '**', component: PageNotFoundComponent}
];
