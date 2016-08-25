import { Test1Component } from './test1/test1.component';
import { Test11Component } from './test11/test11.component';
import { Test2Component } from './test2/test2.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FirebaseAuthService } from './firebase-auth.service';
import { HomeComponent } from './home/home.component';
import { BlogComponent } from './blog/blog.component';

export const ROUTES_CONFIG = [
  {path: '', component: HomeComponent, text: 'Home'},
  {path: 'register', component: RegisterComponent, text: 'Registrieren'},
  {path: 'login', component: LoginComponent, text: 'Login'},
  {path: 'test1', component: Test1Component, text: 'TEST1', canActivate: [FirebaseAuthService]},
  {path: 'test11/:id', component: Test11Component, canActivate: [FirebaseAuthService]},
  {path: 'test2', component: Test2Component, text: 'TEST2', canActivate: [FirebaseAuthService]},
  {path: 'blog', component: BlogComponent, text: 'Blog', canActivate: [FirebaseAuthService]},
];
