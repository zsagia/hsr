import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { RouterModule } from '@angular/router';
import { MdCardModule } from '@angular2-material/card';
import { MdListModule } from '@angular2-material/list';
import { MdButtonModule } from '@angular2-material/button';
import { MdInputModule } from '@angular2-material/input';
import { MdMenuModule } from '@angular2-material/menu';
import { MdCheckboxModule } from '@angular2-material/checkbox';
import { MdCoreModule, MdLineModule, MdRippleModule } from '@angular2-material/core';
import { MdIconModule } from '@angular2-material/icon';
import { MdRadioModule } from '@angular2-material/radio';
import { MdSidenavModule } from '@angular2-material/sidenav';
import { MdToolbarModule } from '@angular2-material/toolbar';
import { MdTooltipModule } from '@angular2-material/tooltip';
import { MdTabsModule } from '@angular2-material/tabs';
import { MdButtonToggleModule } from '@angular2-material/button-toggle';
import { MdGridListModule } from '@angular2-material/grid-list';
import { MdProgressBarModule } from '@angular2-material/progress-bar';
import { MdProgressCircleModule } from '@angular2-material/progress-circle';
import { AppComponent } from './app.component';
import { Test1Component } from './components/test1/test1.component';
import { Test2Component } from './components/test2/test2.component';
import { RegisterComponent } from './components/register/register.component';
import { Test11Component } from './components/test11/test11.component';
import { LoginComponent } from './components/login/login.component';
import { ROUTES_CONFIG } from './config/routes.config';
import { FIREBASE_CONFIG } from './config/firebase.config';
import { FirebaseAuthService } from './shared/firebase-auth.service';
import { FirebaseDatabaseService } from './shared/firebase-database.service';
import { HomeComponent } from './components/home/home.component';
import { BlogComponent } from './components/blog/blog.component';
import { FotosComponent } from './components/fotos/fotos.component';
import { FlyerComponent } from './components/flyer/flyer.component';
import { TinyMceComponent } from './tinymce/tinymce.component';

@NgModule({
  declarations: [
    AppComponent,
    Test1Component,
    Test2Component,
    RegisterComponent,
    Test11Component,
    LoginComponent,
    HomeComponent,
    BlogComponent,
    FotosComponent,
    FlyerComponent,
    TinyMceComponent
  ],
  imports: [
    RouterModule.forRoot(ROUTES_CONFIG),
    BrowserModule,
    CommonModule,
    FormsModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    MdCardModule,
    MdListModule,
    MdButtonModule,
    MdInputModule,
    MdMenuModule,
    MdCheckboxModule,
    MdCoreModule,
    MdIconModule,
    MdRadioModule,
    MdLineModule,
    MdRippleModule,
    MdSidenavModule,
    MdToolbarModule,
    MdTooltipModule,
    MdTabsModule,
    MdButtonToggleModule,
    MdGridListModule,
    MdProgressBarModule,
    MdProgressCircleModule
  ],
  providers: [FirebaseAuthService, FirebaseDatabaseService, FormBuilder],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {

}
