import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImageListComponent } from './images/image-list/image-list.component';
import { ImageComponent } from './images/image/image.component';
import {RegisterUserPageComponent} from "./register-user-page/register-user-page.component";
import {AccountPageComponent} from "./account-page/account-page.component";
import {LoginPageComponent} from "./login-page/login-page.component";

const routes: Routes = [
  { path: '',   redirectTo: '/search', pathMatch: 'full' },
  {path: 'register-user-page', component: RegisterUserPageComponent},
  {path:'account-page', component: AccountPageComponent},
  {path:'login-page', component:LoginPageComponent},
  {path:'search', component:ImageListComponent},
  {path:'upload', component:ImageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
