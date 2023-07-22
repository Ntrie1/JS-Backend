import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegitserComponent } from './regitser/regitser.component';
import { LoginComponent } from './login/login.component';
import { UserRoutingModule } from './user-routing.module';



@NgModule({
  declarations: [
    RegitserComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ],
  exports: [
    RegitserComponent,
    LoginComponent
  ]
})
export class UserModule { }
