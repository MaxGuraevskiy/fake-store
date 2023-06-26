import { NgModule } from '@angular/core';
import {
  provideRouter,
  RouterModule,
  Routes,
  withComponentInputBinding,
} from '@angular/router';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { ItemPageComponent } from './pages/item-page/item-page.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';

const routes: Routes = [
  { path: '', component: ProductPageComponent },
  { path: 'about', component: AboutPageComponent },
  { path: 'item/:id', component: ItemPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [provideRouter(routes, withComponentInputBinding())],
})
export class AppRoutingModule {}
