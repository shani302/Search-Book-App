import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';


const routes: Routes = [
  {path: "search-page", component: SearchPageComponent},
  {path: "book-details/:id", component: BookDetailsComponent},
  {path: "", component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
