import { BrowserModule } from '@angular/platform-browser';
import { NgModule ,  LOCALE_ID} from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import localeFrExtra from '@angular/common/locales/extra/fr';

registerLocaleData(localeFr, 'fr-FR', localeFrExtra);

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule,  ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PostListComponent } from 'src/app/post-list/post-list.component';
import { PostListItemComponent } from 'src/app/post-list-item/post-list-item.component';
import { HeaderComponent } from './header/header/header.component';
import { PostsService } from './services/posts.service';
import { NewPostComponent } from './new-post/new-post.component';


@NgModule({
  declarations: [
    PostListComponent,
    PostListItemComponent,
    AppComponent,
    NewPostComponent,
    HeaderComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [PostsService,{provide: LOCALE_ID, useValue: 'fr-FR'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
