import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {
  MdButtonModule,
  MdButtonToggleModule,
  MdCardModule,
  MdCheckboxModule,
  MdCommonModule,
  MdCoreModule,
  MdGridListModule,
  MdInputModule,
  MdListModule,
  MdMenuModule,
  MdRippleModule,
  MdSnackBarModule,
  MdToolbarModule
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import 'hammerjs';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PlattenDetailsComponent } from './components/platten/platten-details/platten-details.component';
import { PlattenComponent } from './components/platten/platten.component';
import { RegisterComponent } from './components/register/register.component';
import { FIREBASE_CONFIG } from './config/firebase.config';
import { ROUTES_CONFIG } from './config/routes.config';
import { StickyDirective } from './shared/directives/sticky.directive';
import { PipesModule } from './shared/pipes/pipes.module';
import { HsrAuthService } from './shared/services/firebase-auth.service';
import { HsrDatabaseService } from './shared/services/firebase-database.service';
import { HsrStorageService } from './shared/services/firebase-storage.service';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    PlattenComponent,
    PlattenDetailsComponent,
    PageNotFoundComponent,
    StickyDirective
  ],
  imports: [
    PipesModule,
    // Router
    RouterModule.forRoot(ROUTES_CONFIG),
    // Browser
    BrowserModule,
    // AJAX
    HttpModule,
    // Forms
    FormsModule,
    ReactiveFormsModule,
    // AngularFire2
    AngularFireModule.initializeApp(FIREBASE_CONFIG, 'hsr'),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MdButtonModule,
    MdButtonToggleModule,
    MdCardModule,
    MdCheckboxModule,
    MdCommonModule,
    MdCoreModule,
    MdListModule,
    MdInputModule,
    MdRippleModule,
    MdMenuModule,
    MdToolbarModule,
    MdGridListModule,
    MdSnackBarModule
  ],
  providers: [
    HsrAuthService,
    HsrDatabaseService,
    HsrStorageService
  ],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {

}
