import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {HeaderComponent} from "./header/header.component";
import {ShoppingServiceService} from "./shopping/shopping-service.service";
import {AppRoutingModule} from "./app-routing/app-routing.module";
import {NotFoundComponent} from './not-found/not-found.component';
import {RecipeServiceService} from "./recipe/recipe-service.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {AngularFireModule} from "@angular/fire/compat";
import {getDatabase, provideDatabase} from "@angular/fire/database";
import {AuthInterceptorService} from "./auth/auth-interceptor.service";
import {SharedModule} from "./shared/shared.module";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideDatabase(() => getDatabase()),
    AppRoutingModule,
    SharedModule

  ],
  providers: [ShoppingServiceService, RecipeServiceService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }],

  bootstrap: [AppComponent]
})
export class AppModule {
}
