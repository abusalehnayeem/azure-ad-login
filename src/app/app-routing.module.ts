import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MsalAuthGuard } from './_guard/msal-auth.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [MsalAuthGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full'  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
