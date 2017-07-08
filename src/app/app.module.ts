import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MdButtonModule, MdCardModule, MdCommonModule, MdCoreModule, MdIconModule, MdInputModule, MdListModule, MdMenuModule, MdRippleModule, MdSnackBarModule, MdToolbarModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import 'hammerjs';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { FIREBASE_CONFIG } from './config/firebase.config';
import { ROUTES_CONFIG } from './config/routes.config';
import { HsrAuthService } from './shared/services/hsr-auth.service';
import { HsrDatabaseService } from './shared/services/hsr-database.service';
import { HsrStorageService } from './shared/services/hsr-storage.service';
import { NguiStickyModule } from '@ngui/sticky';
import { HsrPlayerService } from './components/player/hsr-player.service';
import { PlayerComponent } from './components/player/player.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    PageNotFoundComponent,
    PlayerComponent
  ],
  imports: [
    RouterModule.forRoot(ROUTES_CONFIG),
    BrowserModule,
    HttpModule,
    FormsModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG, 'hsr'),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MdButtonModule,
    MdCardModule,
    MdCommonModule,
    MdCoreModule,
    MdListModule,
    MdIconModule,
    MdInputModule,
    MdRippleModule,
    MdMenuModule,
    MdToolbarModule,
    MdSnackBarModule,
    NguiStickyModule
  ],
  providers: [
    HsrAuthService,
    HsrDatabaseService,
    HsrStorageService,
    HsrPlayerService
  ],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {

}
