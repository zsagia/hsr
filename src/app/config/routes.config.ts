import { Route } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { PageNotFoundComponent } from '../components/page-not-found/page-not-found.component';
import { RegisterComponent } from '../components/register/register.component';
import { HsrAuthService } from '../shared/services/hsr-auth.service';

export const ROUTES_CONFIG: Route[] = [
  {path: '', redirectTo: 'blog', pathMatch: 'full'},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'blog', loadChildren: './modules/blog/blog.module#BlogModule'},
  {path: 'fotos', loadChildren: './modules/fotos/fotos.module#FotosModule', canActivate: [HsrAuthService]},
  {path: 'chat', loadChildren: './modules/chat/chat.module#ChatModule', canActivate: [HsrAuthService]},
  {path: 'files', loadChildren: './modules/files/files.module#FilesModule', canActivate: [HsrAuthService]},
  {path: 'platten', loadChildren: './modules/platten/platten.module#PlattenModule', canActivate: [HsrAuthService]},
  {path: '**', component: PageNotFoundComponent}
];
