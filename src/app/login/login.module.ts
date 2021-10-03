import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login/login.component';
import { SharedMaterialModule } from '../shared/shared-material/shared-material.module';
import { RouterModule } from '@angular/router';
import { AddChallengeComponent } from '../shared/shared-material/modal/add-challenge.modal';

@NgModule({
  declarations: [
    LoginComponent,
    AddChallengeComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    SharedMaterialModule,
    RouterModule
  ]
})
export class LoginModule { }
