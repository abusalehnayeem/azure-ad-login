import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MsalAuthGuard } from './_guard/msal-auth.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MsalRedirectComponent } from '@azure/msal-angular';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [MsalAuthGuard] },
  { path: 'code', component: HomeComponent},
  { path: 'auth', component: MsalRedirectComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full'  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true, onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
