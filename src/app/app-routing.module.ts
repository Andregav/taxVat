import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaxesPageComponent } from './pages/taxes-page/taxes-page.component';

const routes: Routes = [
{ path: '', component: TaxesPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
