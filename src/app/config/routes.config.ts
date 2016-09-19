import { Test1Component } from '../components/test1/test1.component';
import { Test11Component } from '../components/test11/test11.component';
import { RegisterComponent } from '../components/register/register.component';
import { LoginComponent } from '../components/login/login.component';
import { FirebaseAuthService } from '../services/firebase-auth.service';
import { HomeComponent } from '../components/home/home.component';
import { BlogComponent } from '../components/blog/blog.component';
import { FotosComponent } from '../components/fotos/fotos.component';
import { FlyerComponent } from '../components/flyer/flyer.component';
import { PlattenComponent } from '../components/platten/platten.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';

export const ROUTES_CONFIG = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'test1', component: Test1Component, canActivate: [FirebaseAuthService]},
  {path: 'test11/:id', component: Test11Component, canActivate: [FirebaseAuthService]},
  {path: 'blog', component: BlogComponent, text: 'Blog', canActivate: [FirebaseAuthService]},
  {path: 'fotos', component: FotosComponent, text: 'Fotos', canActivate: [FirebaseAuthService]},
  {path: 'flyer', component: FlyerComponent, text: 'Flyer', canActivate: [FirebaseAuthService]},
  {path: 'platten', component: PlattenComponent, text: 'Platten', canActivate: [FirebaseAuthService]},
  {path: '**', component: PageNotFoundComponent}
];
