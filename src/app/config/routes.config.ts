import { Test1Component } from '../components/test1/test1.component';
import { Test11Component } from '../components/test11/test11.component';
import { Test2Component } from '../components/test2/test2.component';
import { RegisterComponent } from '../components/register/register.component';
import { LoginComponent } from '../components/login/login.component';
import { FirebaseAuthService } from '../shared/firebase-auth.service';
import { HomeComponent } from '../components/home/home.component';
import { BlogComponent } from '../components/blog/blog.component';
import { FotosComponent } from '../components/fotos/fotos.component';
import { FlyerComponent } from '../components/flyer/flyer.component';

export const ROUTES_CONFIG = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'test1', component: Test1Component, text: 'TEST1', canActivate: [FirebaseAuthService]},
  {path: 'test11/:id', component: Test11Component, canActivate: [FirebaseAuthService]},
  {path: 'test2', component: Test2Component, text: 'TEST2', canActivate: [FirebaseAuthService]},
  {path: 'blog', component: BlogComponent, text: 'Blog', canActivate: [FirebaseAuthService]},
  {path: 'fotos', component: FotosComponent, text: 'Fotos', canActivate: [FirebaseAuthService]},
  {path: 'flyer', component: FlyerComponent, text: 'Flyer', canActivate: [FirebaseAuthService]}
];
