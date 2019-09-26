import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { ImageComponent } from './components/image/image.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';

import { AppConfigService } from './services/app-config/app-config.service';

export function initializeApp(appConfig: AppConfigService) {
  return () => appConfig.load();
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SearchPageComponent,
    HeaderComponent,
    FooterComponent,
    BookListComponent,
    ImageComponent,
    BookDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ScrollingModule
  ],
  providers: [
    AppConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppConfigService], multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
