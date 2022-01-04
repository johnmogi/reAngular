import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/pages/about/about.component';
import { CatalogueComponent } from './components/pages/catalogue/catalogue.component';
import { Error404Component } from './components/pages/error404/error404.component';
import { HomeComponent } from './components/pages/home/home.component';

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "catalogue", component: CatalogueComponent },
  { path: "about", component: AboutComponent },
  { path: "", redirectTo: "/home", pathMatch: "full" }, // full = exact
   { path: "**", component: Error404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
