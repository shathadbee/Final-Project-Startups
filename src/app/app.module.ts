import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HeaderModule } from './core/components/layouts/header/header.module';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { SideNavModule } from './core/components/layouts/side-nav/side-nav.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { take } from 'rxjs';
import { AuthService } from './core/services/auth/auth.service';

import {
  AppInitalizService,
  appInitializer,
} from './core/services/app-init/app-initaliz.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    HttpClientModule,
    RouterModule,
    HeaderModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    SideNavModule,

    FontAwesomeModule,

  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: appInitializer,
      deps: [AppInitalizService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
