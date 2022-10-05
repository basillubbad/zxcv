import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllproductsComponent } from './Component/allproducts/allproducts.component';
import { CreateComponent } from './Component/create/create.component';
import { EditComponent } from './Component/edit/edit.component';
import { LoginComponent } from './login/login.component';
import { ShowComponent } from './show/show.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {
path:'',redirectTo:'login',pathMatch:'full'
  },
  {path:'login',
  component:LoginComponent},
  {path:'signup',
  component:SignupComponent},
  {path:'edit',
  component:EditComponent},
  {path:'allproducts',
component:AllproductsComponent},
{path:'create',
component:CreateComponent},
{path:'main',
component:ShowComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
